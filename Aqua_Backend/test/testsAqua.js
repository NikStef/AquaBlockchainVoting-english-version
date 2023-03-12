const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("Aqua", function () {
    let AquaFactory, Aqua
    beforeEach(async function () {
        AquaFactory = await ethers.getContractFactory("Aqua")
        Aqua = await AquaFactory.deploy()
    })

    //changePeriod()
    it("1.Should start with period of registration", async function () {
        const currentValue = await Aqua.getState()
        const expectedValue = "1"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("2.Should update period 1->2 with change period function", async function () {
        await Aqua.changePeriod()
        const currentValue = await Aqua.getState()
        const expectedValue = "2"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("3.Should ΝΟΤ update after 3 function calls of changePeriod", async function () {
        await Aqua.changePeriod()
        await Aqua.changePeriod()
        await expect(Aqua.changePeriod()).to.be.revertedWith("LastStage")
    })
    it("4.Should ΝΟΤ update the period if not owner account is calling", async function () {
        const [owner, otherAccount] = await ethers.getSigners()
        await expect(
            Aqua.connect(otherAccount).changePeriod()
        ).to.be.revertedWith("NotOwner")
    })

    //getCandidateLength()
    it("5.Should start with 0 candidates", async function () {
        const currentValue = await Aqua.getCandidateLength()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })
    //setCandidate()
    it("6.Should update the candidate list after a successful call of setCandidate", async function () {
        const [owner] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        const currentValue = await Aqua.getCandidateLength()
        const expectedValue = "1"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("7.Should ΝΟΤ set a Candidate if the period is not Registration", async function () {
        const [owner] = await ethers.getSigners()
        await Aqua.changePeriod()
        await expect(
            Aqua.setCandidate(owner.address, "Link")
        ).to.be.revertedWith("OutsideOfRegistration")
    })
    it("8.Should ΝΟΤ set a candidate if the candidate already exists", async function () {
        const [owner] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await expect(
            Aqua.setCandidate(owner.address, "Link")
        ).to.be.to.be.revertedWith("CanAlreadyExists")
    })
    it("9.Should ΝΟΤ update the candidate list if not the owner is calling the function setCandidate()", async function () {
        const [owner, otherAccount] = await ethers.getSigners()
        await expect(
            Aqua.connect(otherAccount).setCandidate(
                otherAccount.address,
                "Link"
            )
        ).to.be.revertedWith("NotOwner")
    })
    //getVoterLength()
    it("10.Should start with 0 voters", async function () {
        const currentValue = await Aqua.getVoterLength()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })
    //setVoter()
    it("11.Should update the voter list after a successful call of setVoter", async function () {
        const [owner] = await ethers.getSigners()
        await Aqua.setVoter(owner.address)
        const currentValue = await Aqua.getVoterLength()
        const expectedValue = "1"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("12.Should ΝΟΤ set a voter if the period is not Registration", async function () {
        const [owner] = await ethers.getSigners()
        await Aqua.changePeriod()
        await expect(Aqua.setVoter(owner.address)).to.be.revertedWith(
            "OutsideOfRegistration"
        )
    })
    it("13.Should ΝΟΤ set a voter if the voter already exists", async function () {
        const [owner] = await ethers.getSigners()
        await Aqua.setVoter(owner.address)
        await expect(Aqua.setVoter(owner.address)).to.be.revertedWith(
            "VotAlreadyExists"
        )
    })
    it("14.Should ΝΟΤ update the voter list if not the owner is calling the function setVoter", async function () {
        const [owner, otherAccount] = await ethers.getSigners()
        await expect(
            Aqua.connect(otherAccount).setVoter(otherAccount.address)
        ).to.be.revertedWith("NotOwner")
    })
    //getInformation
    it("15.Should ΝΟΤ getInformation if period is not ending", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.changePeriod()
        await Aqua.vote("1", "0", "0")
        await expect(Aqua.getInformation(1)).to.be.revertedWith("OutsideOfEnd")
    })

    //vote
    it("16.Should vote if the user has the right to vote (x,y,z)", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.setCandidate(user2.address, "Trick")
        await Aqua.setVoter(owner.address)
        await Aqua.changePeriod()
        await Aqua.vote("1", "2", "3")
        await Aqua.changePeriod()
        const currentValue1 = await Aqua.getInformation(1)
        const currentValue2 = await Aqua.getInformation(2)
        const currentValue3 = await Aqua.getInformation(3)
        const expectedValue = "1"
        assert.equal(currentValue1.voteCount.toString(), expectedValue)
        assert.equal(currentValue2.voteCount.toString(), expectedValue)
        assert.equal(currentValue3.voteCount.toString(), expectedValue)
    })
    it("16,1. Should vote if a user has a right to vote (0,0,0)", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await Aqua.vote("0", "0", "0")
        await Aqua.changePeriod()
        const currentValue = await Aqua.getInformation(0)
        const expectedValue = "1"
        assert.equal(currentValue.voteCount.toString(), expectedValue)
    })
    it("16,2. Should vote if the user has the right to vote (x,x,z)", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.setVoter(owner.address)
        await Aqua.changePeriod()
        await Aqua.vote("1", "1", "2")
        await Aqua.changePeriod()
        const currentValue1 = await Aqua.getInformation(1)
        const currentValue2 = await Aqua.getInformation(2)
        const expectedValue = "1"
        assert.equal(currentValue1.voteCount.toString(), expectedValue)
        assert.equal(currentValue2.voteCount.toString(), expectedValue)
    })
    it("16,3. Should vote if the user has the right to vote (x,z,x)", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.setVoter(owner.address)
        await Aqua.changePeriod()
        await Aqua.vote("1", "2", "1")
        await Aqua.changePeriod()
        const currentValue1 = await Aqua.getInformation(1)
        const currentValue2 = await Aqua.getInformation(2)
        const expectedValue = "1"
        assert.equal(currentValue1.voteCount.toString(), expectedValue)
        assert.equal(currentValue2.voteCount.toString(), expectedValue)
    })
    it("16,4. Should vote if the user has the right to vote (z,x,x)", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.setVoter(owner.address)
        await Aqua.changePeriod()
        await Aqua.vote("2", "1", "1")
        await Aqua.changePeriod()
        const currentValue1 = await Aqua.getInformation(1)
        const currentValue2 = await Aqua.getInformation(2)
        const expectedValue = "1"
        assert.equal(currentValue1.voteCount.toString(), expectedValue)
        assert.equal(currentValue2.voteCount.toString(), expectedValue)
    })
    it("17.Should ΝΟΤ vote a bad designed vote", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.changePeriod()
        await expect(Aqua.vote("2", "0", "0")).to.be.revertedWith(
            "BadDesignedVote"
        )
    })
    // it("17,1. Should ΝΟΤ vote a bad designed vote", async function () {
    //     const [owner, user1, user2] = await ethers.getSigners()
    //     await Aqua.setCandidate(owner.address, "Link")
    //     await Aqua.setVoter(owner.address)
    //     await Aqua.changePeriod()
    //     await expect(Aqua.vote("1", "1", "0")).to.be.revertedWithCustomError(
    //         Aqua,
    //         "Aqua_BadDesignedVote2"
    //     )
    // })
    // it("17,2. Should ΝΟΤ vote a bad designed vote", async function () {
    //     const [owner, user1, user2] = await ethers.getSigners()
    //     await Aqua.setCandidate(owner.address, "Link")
    //     await Aqua.setVoter(owner.address)
    //     await Aqua.changePeriod()
    //     await expect(Aqua.vote("1", "0", "1")).to.be.revertedWithCustomError(
    //         Aqua,
    //         "Aqua_BadDesignedVote2"
    //     )
    // })
    // it("17,3. Should ΝΟΤ vote a bad designed vote", async function () {
    //     const [owner, user1, user2] = await ethers.getSigners()
    //     await Aqua.setCandidate(owner.address, "Link")
    //     await Aqua.setVoter(owner.address)
    //     await Aqua.changePeriod()
    //     await expect(Aqua.vote("0", "1", "1")).to.be.revertedWithCustomError(
    //         Aqua,
    //         "Aqua_BadDesignedVote2"
    //     )
    // })
    // it("17,4. Should ΝΟΤ vote a bad designed vote", async function () {
    //     const [owner, user1, user2] = await ethers.getSigners()
    //     await Aqua.setCandidate(owner.address, "Link")
    //     await Aqua.setVoter(owner.address)
    //     await Aqua.changePeriod()
    //     await expect(Aqua.vote("1", "1", "1")).to.be.revertedWithCustomError(
    //         Aqua,
    //         "Aqua_BadDesignedVote2"
    //     )
    // })
    it("18.Should ΝΟΤ vote twice", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.changePeriod()
        await Aqua.vote("1", "0", "0")
        await expect(Aqua.vote("1", "0", "0")).to.be.revertedWith(
            "AlreadyVoted"
        )
    })
    it("19.Should ΝΟΤ vote outside of voting period", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await expect(Aqua.vote("1", "0", "0")).to.be.revertedWith(
            "OutsideOfVoting"
        )
    })
    it("20.Should ΝΟΤ vote if doesn't have a right to vote", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.changePeriod()
        await expect(Aqua.vote("1", "0", "0")).to.be.revertedWith("NoRight")
    })
    //getCandidateName
    it("21.Should return the candidate name", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        const currentValue = await Aqua.getCandidateName("1")
        const expectedValue = "Link"
        assert.equal(currentValue, expectedValue)
    })
    //getNumOfIncompleteVotes
    it("22.Should calculate the correct amount of incomplete votes", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.changePeriod()
        await Aqua.vote("1", "0", "0")
        await Aqua.changePeriod()
        const currentValue = await Aqua.getNumOfIncompleteVotes()
        const expectedValue = "1"
        assert.equal(currentValue, expectedValue)
    })

    it("23.Should calculate the correct amount of incomplete votes", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.changePeriod()
        await Aqua.vote("1", "0", "0")
        await expect(Aqua.getNumOfIncompleteVotes()).to.be.revertedWith(
            "OutsideOfEnd"
        )
    })

    //getTotalVotersVote
    it("24.Should calculate the correct number of registered voters that actually voted", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.changePeriod()
        await Aqua.vote("1", "0", "0")
        const currentValue = await Aqua.getTotalVotersVote()
        const expectedValue = "1"
        assert.equal(currentValue, expectedValue)
    })
    //getApprovalOfZero
    it("25.Should calculate the incomplete ballots on all the extremities", async function () {
        const [
            owner,
            user1,
            user2,
            user3,
            user4,
            user5,
            user6,
            user7,
            user8,
            user9,
            user10,
            user11,
            user12,
            user13,
        ] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.setCandidate(user2.address, "Trick")
        await Aqua.setVoter(owner.address)
        await Aqua.setVoter(user1.address)
        await Aqua.setVoter(user2.address)
        await Aqua.setVoter(user3.address)
        await Aqua.setVoter(user4.address)
        await Aqua.setVoter(user5.address)
        await Aqua.setVoter(user6.address)
        await Aqua.setVoter(user7.address)
        await Aqua.setVoter(user8.address)
        await Aqua.setVoter(user9.address)
        await Aqua.setVoter(user10.address)
        await Aqua.setVoter(user11.address)
        await Aqua.setVoter(user12.address)
        await Aqua.setVoter(user13.address)
        await Aqua.changePeriod()
        await Aqua.vote("1", "1", "2")
        await Aqua.connect(user1).vote("1", "1", "0")
        await Aqua.connect(user2).vote("1", "2", "1")
        await Aqua.connect(user3).vote("1", "0", "1")
        await Aqua.connect(user4).vote("2", "1", "1")
        await Aqua.connect(user5).vote("0", "2", "1")
        await Aqua.connect(user6).vote("1", "1", "1")
        await Aqua.connect(user7).vote("0", "0", "0")
        await Aqua.connect(user8).vote("1", "2", "0")
        await Aqua.connect(user9).vote("0", "2", "1")
        await Aqua.connect(user10).vote("1", "0", "2")
        await Aqua.connect(user11).vote("0", "0", "1")
        await Aqua.connect(user12).vote("0", "1", "0")
        await Aqua.connect(user13).vote("1", "0", "0")
        await Aqua.changePeriod()
        const currentValue = await Aqua.getNumOfIncompleteVotes()
        const expectedValue = "14"
        assert.equal(currentValue.toString(), expectedValue)
    })
    //isResults
    it("26.Should start with results = 0", async function () {
        const currentValue = await Aqua.isResults()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })
    //getWinner
    it("27.Should calculate the results", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await Aqua.vote("1", "2", "0")
        await Aqua.changePeriod()
        await Aqua.getResults()
        const currentValue = await Aqua.isResults()
        const expectedValue = "1"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("28.Should ΝΟΤ calculate the winners twice", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.setVoter(owner.address)
        await Aqua.changePeriod()
        await Aqua.vote("1", "2", "0")
        await Aqua.changePeriod()
        await Aqua.getResults()
        await expect(Aqua.getResults()).to.be.revertedWith("AlreadyCalculated")
    })
    it("29.Should ΝΟΤ calculate the winners outside of the correct period", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await Aqua.vote("1", "2", "0")
        await expect(Aqua.getResults()).to.be.revertedWith("OutsideOfEnd")
    })
    //getTotalOfAVScore
    it("30.Should calculate the correct sum of AV-score", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.setCandidate(user2.address, "Trick")
        await Aqua.changePeriod()
        await Aqua.vote("1", "2", "3")
        await Aqua.changePeriod()
        await Aqua.getResults()
        const currentValue = await Aqua.getTotalOfAVScore()
        const expectedValue = "3"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("31.Should calculate correct sum of AV-score in the extremities: example{voting with the same id,{x,x,y}}", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.setCandidate(user2.address, "Trick")
        await Aqua.changePeriod()
        await Aqua.vote("1", "1", "2")
        await Aqua.changePeriod()
        await Aqua.getResults()
        const currentValue = await Aqua.getTotalOfAVScore()
        const expectedValue = "2"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("32.Should calculate correct sum of AV-score in the extremities: example{voting with the same id,{x,y,x}}", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.setCandidate(user2.address, "Trick")
        await Aqua.changePeriod()
        await Aqua.vote("1", "2", "1")
        await Aqua.changePeriod()
        await Aqua.getResults()
        const currentValue = await Aqua.getTotalOfAVScore()
        const expectedValue = "2"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("33.Should calculate correct sum of AV-score in the extremities: example{voting with the same id,{y,x,x}}", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.setCandidate(user2.address, "Trick")
        await Aqua.changePeriod()
        await Aqua.vote("1", "2", "2")
        await Aqua.changePeriod()
        await Aqua.getResults()
        const currentValue = await Aqua.getTotalOfAVScore()
        const expectedValue = "2"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("34.Should calculate correct sum of AV-score in the extremities: example{voting with the same id,{x,x,x}}", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.setCandidate(user2.address, "Trick")
        await Aqua.changePeriod()
        await Aqua.vote("1", "1", "1")
        await Aqua.changePeriod()
        await Aqua.getResults()
        const currentValue = await Aqua.getTotalOfAVScore()
        const expectedValue = "1"
        assert.equal(currentValue.toString(), expectedValue)
    })
    //getWinnersbyId
    it("35.Should calculate the correct winners", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(user1.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.setCandidate(user2.address, "Trick")
        await Aqua.changePeriod()
        await Aqua.connect(user1).vote("1", "2", "3")
        await Aqua.changePeriod()
        await Aqua.getResults()
        const currentValue1 = await Aqua.getWinnersbyId(0)
        const expectedValue1 = "1"
        const currentValue2 = await Aqua.getWinnersbyId(1)
        const expectedValue2 = "2"
        const currentValue3 = await Aqua.getWinnersbyId(2)
        const expectedValue3 = "3"
        assert.equal(currentValue1.toString(), expectedValue1)
        assert.equal(currentValue2.toString(), expectedValue2)
        assert.equal(currentValue3.toString(), expectedValue3)
    })
    //getTotalVotersVote
    it("36.Should calculate the correct number of registered voters that actually voted", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.changePeriod()
        await Aqua.vote("1", "0", "0")
        const currentValue = await Aqua.getTotalVotersVote()
        const expectedValue = "1"
        assert.equal(currentValue, expectedValue)
    })
})
