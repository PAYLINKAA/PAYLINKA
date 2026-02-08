// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IPaylinkaRouter
 * @notice Interface for the Paylinka payment link router
 */
interface IPaylinkaRouter {
    struct PaymentLink {
        address creator;
        address recipient;
        address token; // address(0) = native ETH
        uint256 amount;
        uint256 expiry; // 0 = no expiry
        string memo;
        bool paid;
        bool cancelled;
    }

    event LinkCreated(
        bytes32 indexed linkId,
        address indexed creator,
        address indexed recipient,
        address token,
        uint256 amount,
        uint256 expiry,
        string memo
    );

    event PaymentCompleted(
        bytes32 indexed linkId,
        address indexed payer,
        address indexed recipient,
        address token,
        uint256 amount
    );

    event LinkCancelled(bytes32 indexed linkId);

    function createPaymentLink(
        address recipient,
        address token,
        uint256 amount,
        uint256 expiry,
        string calldata memo
    ) external returns (bytes32 linkId);

    function pay(bytes32 linkId) external payable;

    function cancelLink(bytes32 linkId) external;

    function getLink(bytes32 linkId) external view returns (PaymentLink memory);

    function getLinksByCreator(address creator) external view returns (bytes32[] memory);
}
