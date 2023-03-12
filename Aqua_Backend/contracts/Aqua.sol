//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Aqua {
    address private immutable i_votingInitiator;
    uint256 private Candidate_Id = 0;
    uint256 private Voter_Id = 0;
    address private non_Approval;

    enum Period {
        Initialize,
        Register,
        Voting,
        End
    }
    Period private period = Period.Initialize;

    uint256 private _tempWinnerVoteCount = 0;
    uint256 private _tempWinner = 0;
    uint256[] private _tempEndingVoteCounts;

    uint256[] private winners;

    uint8 private results = 0;
    uint256 private totalOfAVScore = 0;

    //Candidate Data ---START---
    struct Candidate {
        uint256 candidateId;
        string name;
        uint256 voteCount;
        address candidateAddress;
    }

    address[] private candidateAddress;

    mapping(uint => Candidate) private candidates;
    //Candidate Data ---END---

    //Voter Data ---START---
    struct Voter {
        uint256 voterId;
        uint256 voter_allowed;
        address voter_address;
        bool voter_voted;
        uint256 voter_vote1;
        uint256 voter_vote2;
        uint256 voter_vote3;
    }

    address[] private voterAddress;
    address[] private votedVoters;
    mapping(address => Voter) private voters;

    //Voter Data ---END---

    constructor() {
        i_votingInitiator = msg.sender;
        period = Period.Register;
        candidateAddress.push(non_Approval);
    }

    modifier onlyInitiator() {
        if (msg.sender != i_votingInitiator) revert("NotOwner");
        _;
    }

    modifier onlyRegistrationPeriod() {
        if (!(period == Period.Register)) revert("OutsideOfRegistration");
        _;
    }

    modifier onlyVotingPeriod() {
        if (!(period == Period.Voting)) revert("OutsideOfVoting");
        _;
    }

    modifier onlyEndPeriod() {
        if (!(period == Period.End)) revert("OutsideOfEnd");
        _;
    }

    //Functions
    function changePeriod() public onlyInitiator {
        if (uint(period) == 3) {
            revert("LastStage");
        }
        period = Period(uint(period) + 1);
    }

    //--Candidate--
    function setCandidate(
        address _address,
        string memory _name
    ) public onlyInitiator onlyRegistrationPeriod {
        for (uint i = 0; i < candidateAddress.length; i++) {
            if (candidateAddress[i] == _address) {
                revert("CanAlreadyExists");
            }
        }

        Candidate_Id++;

        Candidate storage candidate = candidates[Candidate_Id];

        candidate.candidateId = Candidate_Id;
        candidate.name = _name;
        candidate.voteCount = 0;
        candidate.candidateAddress = _address;
        candidateAddress.push(_address);
    }

    //--Voter--
    function setVoter(
        address _address
    ) public onlyInitiator onlyRegistrationPeriod {
        for (uint i = 0; i < voterAddress.length; i++) {
            if (voterAddress[i] == _address) {
                revert("VotAlreadyExists");
            }
        }
        Voter storage voter = voters[_address];

        voter.voter_address = _address;
        voter.voterId = Voter_Id;

        voter.voter_allowed = 1;

        voter.voter_vote1 = 1000;
        voter.voter_vote2 = 1000;
        voter.voter_vote3 = 1000;
        voter.voter_voted = false;
        voterAddress.push(_address);

        Voter_Id++;
    }

    function vote(
        uint256 _candidate1VoteId,
        uint256 _candidate2VoteId,
        uint256 _candidate3VoteId
    ) external onlyVotingPeriod {
        Voter storage voter = voters[msg.sender];
        if (voter.voter_voted == true) {
            revert("AlreadyVoted");
        }
        if (voter.voter_allowed == 0) {
            revert("NoRight");
        }

        uint wave = candidateAddress.length - 1;

        if (
            (_candidate1VoteId > wave) ||
            (_candidate2VoteId > wave) ||
            (_candidate3VoteId > wave)
        ) {
            revert("BadDesignedVote");
        }

        //Votes
        if (
            (_candidate1VoteId == _candidate2VoteId) &&
            (_candidate2VoteId == _candidate3VoteId)
        ) {
            voter.voter_vote1 = _candidate1VoteId;
            candidates[_candidate1VoteId].voteCount =
                candidates[_candidate1VoteId].voteCount +
                1;
            voter.voter_vote2 = 0;
            if (!(_candidate1VoteId == 0)) {
                candidates[0].voteCount = candidates[0].voteCount + 1;
            }
            voter.voter_vote3 = 0;
        } else if (_candidate1VoteId == _candidate2VoteId) {
            voter.voter_vote1 = _candidate1VoteId;
            candidates[_candidate1VoteId].voteCount =
                candidates[_candidate1VoteId].voteCount +
                1;

            voter.voter_vote2 = 0;
            if (!(_candidate1VoteId == 0)) {
                candidates[0].voteCount = candidates[0].voteCount + 1;
            }

            voter.voter_vote3 = _candidate3VoteId;
            if (!(_candidate3VoteId == 0)) {
                candidates[_candidate3VoteId].voteCount =
                    candidates[_candidate3VoteId].voteCount +
                    1;
            }
        } else if (_candidate1VoteId == _candidate3VoteId) {
            voter.voter_vote1 = _candidate1VoteId;
            candidates[_candidate1VoteId].voteCount =
                candidates[_candidate1VoteId].voteCount +
                1;

            voter.voter_vote2 = _candidate2VoteId;
            if (!(_candidate2VoteId == 0)) {
                candidates[_candidate2VoteId].voteCount =
                    candidates[_candidate2VoteId].voteCount +
                    1;
            }

            voter.voter_vote3 = 0;
            if (!(_candidate3VoteId == 0)) {
                candidates[0].voteCount = candidates[0].voteCount + 1;
            }
        } else if (_candidate2VoteId == _candidate3VoteId) {
            voter.voter_vote1 = _candidate1VoteId;
            if (!(_candidate1VoteId == 0)) {
                candidates[_candidate1VoteId].voteCount =
                    candidates[_candidate1VoteId].voteCount +
                    1;
            }

            voter.voter_vote2 = _candidate2VoteId;
            candidates[_candidate2VoteId].voteCount =
                candidates[_candidate2VoteId].voteCount +
                1;

            voter.voter_vote3 = 0;
            if (!(_candidate3VoteId == 0)) {
                candidates[0].voteCount = candidates[0].voteCount + 1;
            }
        } else {
            voter.voter_vote1 = _candidate1VoteId;
            candidates[_candidate1VoteId].voteCount =
                candidates[_candidate1VoteId].voteCount +
                1;
            voter.voter_vote2 = _candidate2VoteId;
            candidates[_candidate2VoteId].voteCount =
                candidates[_candidate2VoteId].voteCount +
                1;

            voter.voter_vote3 = _candidate3VoteId;
            candidates[_candidate3VoteId].voteCount =
                candidates[_candidate3VoteId].voteCount +
                1;
        }
        voter.voter_voted = true;
        votedVoters.push(msg.sender);
    }

    function getResults() public onlyInitiator onlyEndPeriod {
        if (results == 1) {
            revert("AlreadyCalculated");
        }

        for (uint x = 0; x < candidateAddress.length; x++) {
            _tempEndingVoteCounts.push(candidates[x].voteCount);
            _tempEndingVoteCounts[0] = 0;
            totalOfAVScore = totalOfAVScore + _tempEndingVoteCounts[x];

            if ((_tempEndingVoteCounts[x] > _tempWinnerVoteCount)) {
                _tempWinnerVoteCount = candidates[x].voteCount;
                _tempWinner = x;
            }
        }
        winners.push(_tempWinner);

        _tempWinnerVoteCount = 0;
        _tempEndingVoteCounts[_tempWinner] = 0;
        _tempWinner = 0;
        for (uint x = 0; x < candidateAddress.length; x++) {
            if (_tempEndingVoteCounts[x] > _tempWinnerVoteCount) {
                _tempWinnerVoteCount = _tempEndingVoteCounts[x];
                _tempWinner = x;
            }
        }
        winners.push(_tempWinner);

        _tempWinnerVoteCount = 0;
        _tempEndingVoteCounts[_tempWinner] = 0;
        _tempWinner = 0;

        for (uint x = 0; x < candidateAddress.length; x++) {
            if (_tempEndingVoteCounts[x] > _tempWinnerVoteCount) {
                _tempWinnerVoteCount = _tempEndingVoteCounts[x];
                _tempWinner = x;
            }
        }
        winners.push(_tempWinner);
        results = 1;
    }

    function getState() public view returns (Period) {
        return period;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length - 1;
    }

    function getVoterLength() public view returns (uint256) {
        return voterAddress.length;
    }

    function getTotalVotersVote() public view returns (uint256) {
        return votedVoters.length;
    }

    function getInformation(
        uint256 _index
    ) public view onlyEndPeriod returns (Candidate memory) {
        return candidates[_index];
    }

    function getCandidateName(
        uint256 _index
    ) public view returns (string memory) {
        return candidates[_index].name;
    }

    function getNumOfIncompleteVotes()
        public
        view
        onlyEndPeriod
        returns (uint256)
    {
        return candidates[0].voteCount;
    }

    function getTotalOfAVScore() public view returns (uint256) {
        return totalOfAVScore;
    }

    function getWinnersbyId(uint256 _index) public view returns (uint) {
        return winners[_index];
    }

    function isResults() public view returns (uint8) {
        return results;
    }
}
