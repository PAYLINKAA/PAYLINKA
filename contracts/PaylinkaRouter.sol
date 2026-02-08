// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./interfaces/IPaylinkaRouter.sol";

/**
 * @title PaylinkaRouter
 * @author Paylinka Team
 * @notice Core contract for creating and executing on-chain payment links
 * @dev Supports native ETH and ERC-20 token payments with optional expiry and memos
 */
contract PaylinkaRouter is IPaylinkaRouter {
    // ─── State ───────────────────────────────────────────────
    mapping(bytes32 => PaymentLink) public links;
    mapping(address => bytes32[]) private _creatorLinks;
    uint256 public linkCount;

    // ─── Modifiers ───────────────────────────────────────────
    modifier linkExists(bytes32 linkId) {
        require(links[linkId].recipient != address(0), "Paylinka: link does not exist");
        _;
    }

    modifier notPaid(bytes32 linkId) {
        require(!links[linkId].paid, "Paylinka: already paid");
        _;
    }

    modifier notCancelled(bytes32 linkId) {
        require(!links[linkId].cancelled, "Paylinka: link cancelled");
        _;
    }

    modifier notExpired(bytes32 linkId) {
        require(
            links[linkId].expiry == 0 || block.timestamp <= links[linkId].expiry,
            "Paylinka: link expired"
        );
        _;
    }

    // ─── Create ──────────────────────────────────────────────

    /**
     * @notice Create a new payment link
     * @param recipient The address that will receive the payment
     * @param token The ERC-20 token address (address(0) for native ETH)
     * @param amount The payment amount in wei / token units
     * @param expiry Unix timestamp for link expiry (0 = no expiry)
     * @param memo Optional memo or reference string
     * @return linkId The unique identifier for this payment link
     */
    function createPaymentLink(
        address recipient,
        address token,
        uint256 amount,
        uint256 expiry,
        string calldata memo
    ) external returns (bytes32 linkId) {
        require(recipient != address(0), "Paylinka: zero recipient");
        require(amount > 0, "Paylinka: zero amount");
        require(expiry == 0 || expiry > block.timestamp, "Paylinka: expiry in past");

        linkCount++;
        linkId = keccak256(
            abi.encodePacked(msg.sender, recipient, token, amount, linkCount, block.timestamp)
        );

        links[linkId] = PaymentLink({
            creator: msg.sender,
            recipient: recipient,
            token: token,
            amount: amount,
            expiry: expiry,
            memo: memo,
            paid: false,
            cancelled: false
        });

        _creatorLinks[msg.sender].push(linkId);

        emit LinkCreated(linkId, msg.sender, recipient, token, amount, expiry, memo);
    }

    // ─── Pay ─────────────────────────────────────────────────

    /**
     * @notice Execute a payment through a link
     * @param linkId The unique payment link identifier
     */
    function pay(bytes32 linkId)
        external
        payable
        linkExists(linkId)
        notPaid(linkId)
        notCancelled(linkId)
        notExpired(linkId)
    {
        PaymentLink storage link = links[linkId];

        if (link.token == address(0)) {
            // Native ETH payment
            require(msg.value >= link.amount, "Paylinka: insufficient ETH");

            (bool sent, ) = link.recipient.call{value: link.amount}("");
            require(sent, "Paylinka: ETH transfer failed");

            // Refund excess
            if (msg.value > link.amount) {
                (bool refunded, ) = msg.sender.call{value: msg.value - link.amount}("");
                require(refunded, "Paylinka: refund failed");
            }
        } else {
            // ERC-20 payment
            require(msg.value == 0, "Paylinka: no ETH for token payment");

            (bool success, bytes memory data) = link.token.call(
                abi.encodeWithSignature(
                    "transferFrom(address,address,uint256)",
                    msg.sender,
                    link.recipient,
                    link.amount
                )
            );
            require(
                success && (data.length == 0 || abi.decode(data, (bool))),
                "Paylinka: token transfer failed"
            );
        }

        link.paid = true;

        emit PaymentCompleted(linkId, msg.sender, link.recipient, link.token, link.amount);
    }

    // ─── Cancel ──────────────────────────────────────────────

    /**
     * @notice Cancel an unpaid payment link (creator only)
     * @param linkId The unique payment link identifier
     */
    function cancelLink(bytes32 linkId)
        external
        linkExists(linkId)
        notPaid(linkId)
    {
        require(links[linkId].creator == msg.sender, "Paylinka: not creator");
        links[linkId].cancelled = true;
        emit LinkCancelled(linkId);
    }

    // ─── Views ───────────────────────────────────────────────

    /**
     * @notice Get details of a payment link
     */
    function getLink(bytes32 linkId) external view returns (PaymentLink memory) {
        return links[linkId];
    }

    /**
     * @notice Get all link IDs created by an address
     */
    function getLinksByCreator(address creator) external view returns (bytes32[] memory) {
        return _creatorLinks[creator];
    }

    /**
     * @notice Check if a link is still active (not paid, not cancelled, not expired)
     */
    function isLinkActive(bytes32 linkId) external view returns (bool) {
        PaymentLink memory link = links[linkId];
        if (link.recipient == address(0)) return false;
        if (link.paid || link.cancelled) return false;
        if (link.expiry != 0 && block.timestamp > link.expiry) return false;
        return true;
    }
}
