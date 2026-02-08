import { expect } from "chai";
import { ethers } from "hardhat";
import { PaylinkaRouter } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("PaylinkaRouter", function () {
  let router: PaylinkaRouter;
  let owner: SignerWithAddress;
  let recipient: SignerWithAddress;
  let payer: SignerWithAddress;

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  beforeEach(async function () {
    [owner, recipient, payer] = await ethers.getSigners();

    const PaylinkaRouter = await ethers.getContractFactory("PaylinkaRouter");
    router = await PaylinkaRouter.deploy();
  });

  describe("createPaymentLink", function () {
    it("should create a payment link with valid params", async function () {
      const tx = await router.createPaymentLink(
        recipient.address,
        ZERO_ADDRESS, // ETH
        ethers.parseEther("1"),
        0, // no expiry
        "Test payment"
      );

      const receipt = await tx.wait();
      expect(receipt).to.not.be.null;

      const linkCount = await router.linkCount();
      expect(linkCount).to.equal(1);
    });

    it("should emit LinkCreated event", async function () {
      await expect(
        router.createPaymentLink(
          recipient.address,
          ZERO_ADDRESS,
          ethers.parseEther("1"),
          0,
          "Test"
        )
      ).to.emit(router, "LinkCreated");
    });

    it("should reject zero recipient", async function () {
      await expect(
        router.createPaymentLink(
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ethers.parseEther("1"),
          0,
          ""
        )
      ).to.be.revertedWith("Paylinka: zero recipient");
    });

    it("should reject zero amount", async function () {
      await expect(
        router.createPaymentLink(
          recipient.address,
          ZERO_ADDRESS,
          0,
          0,
          ""
        )
      ).to.be.revertedWith("Paylinka: zero amount");
    });
  });

  describe("pay (ETH)", function () {
    let linkId: string;

    beforeEach(async function () {
      const tx = await router.createPaymentLink(
        recipient.address,
        ZERO_ADDRESS,
        ethers.parseEther("1"),
        0,
        "Pay me"
      );
      const receipt = await tx.wait();
      const event = receipt?.logs.find((log) => {
        try {
          return router.interface.parseLog({ topics: log.topics as string[], data: log.data })?.name === "LinkCreated";
        } catch {
          return false;
        }
      });
      const parsed = router.interface.parseLog({
        topics: event!.topics as string[],
        data: event!.data,
      });
      linkId = parsed!.args[0];
    });

    it("should process ETH payment", async function () {
      const recipientBalBefore = await ethers.provider.getBalance(recipient.address);

      await router.connect(payer).pay(linkId, {
        value: ethers.parseEther("1"),
      });

      const recipientBalAfter = await ethers.provider.getBalance(recipient.address);
      expect(recipientBalAfter - recipientBalBefore).to.equal(ethers.parseEther("1"));

      const link = await router.getLink(linkId);
      expect(link.paid).to.be.true;
    });

    it("should emit PaymentCompleted event", async function () {
      await expect(
        router.connect(payer).pay(linkId, {
          value: ethers.parseEther("1"),
        })
      ).to.emit(router, "PaymentCompleted");
    });

    it("should reject insufficient ETH", async function () {
      await expect(
        router.connect(payer).pay(linkId, {
          value: ethers.parseEther("0.5"),
        })
      ).to.be.revertedWith("Paylinka: insufficient ETH");
    });

    it("should refund excess ETH", async function () {
      const payerBalBefore = await ethers.provider.getBalance(payer.address);

      const tx = await router.connect(payer).pay(linkId, {
        value: ethers.parseEther("2"),
      });
      const receipt = await tx.wait();
      const gasUsed = receipt!.gasUsed * receipt!.gasPrice;

      const payerBalAfter = await ethers.provider.getBalance(payer.address);
      // Payer should have lost ~1 ETH + gas, not 2 ETH
      const spent = payerBalBefore - payerBalAfter;
      expect(spent).to.be.closeTo(ethers.parseEther("1") + gasUsed, ethers.parseEther("0.01"));
    });

    it("should reject double payment", async function () {
      await router.connect(payer).pay(linkId, {
        value: ethers.parseEther("1"),
      });

      await expect(
        router.connect(payer).pay(linkId, {
          value: ethers.parseEther("1"),
        })
      ).to.be.revertedWith("Paylinka: already paid");
    });
  });

  describe("cancelLink", function () {
    let linkId: string;

    beforeEach(async function () {
      const tx = await router.createPaymentLink(
        recipient.address,
        ZERO_ADDRESS,
        ethers.parseEther("1"),
        0,
        ""
      );
      const receipt = await tx.wait();
      const event = receipt?.logs.find((log) => {
        try {
          return router.interface.parseLog({ topics: log.topics as string[], data: log.data })?.name === "LinkCreated";
        } catch {
          return false;
        }
      });
      const parsed = router.interface.parseLog({
        topics: event!.topics as string[],
        data: event!.data,
      });
      linkId = parsed!.args[0];
    });

    it("should cancel a link", async function () {
      await router.cancelLink(linkId);
      const link = await router.getLink(linkId);
      expect(link.cancelled).to.be.true;
    });

    it("should reject payment on cancelled link", async function () {
      await router.cancelLink(linkId);
      await expect(
        router.connect(payer).pay(linkId, {
          value: ethers.parseEther("1"),
        })
      ).to.be.revertedWith("Paylinka: link cancelled");
    });

    it("should reject cancel from non-creator", async function () {
      await expect(
        router.connect(payer).cancelLink(linkId)
      ).to.be.revertedWith("Paylinka: not creator");
    });
  });

  describe("isLinkActive", function () {
    it("should return true for active link", async function () {
      const tx = await router.createPaymentLink(
        recipient.address,
        ZERO_ADDRESS,
        ethers.parseEther("1"),
        0,
        ""
      );
      const receipt = await tx.wait();
      const event = receipt?.logs.find((log) => {
        try {
          return router.interface.parseLog({ topics: log.topics as string[], data: log.data })?.name === "LinkCreated";
        } catch {
          return false;
        }
      });
      const parsed = router.interface.parseLog({
        topics: event!.topics as string[],
        data: event!.data,
      });
      const linkId = parsed!.args[0];

      expect(await router.isLinkActive(linkId)).to.be.true;
    });

    it("should return false for non-existent link", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("fake"));
      expect(await router.isLinkActive(fakeId)).to.be.false;
    });
  });
});
