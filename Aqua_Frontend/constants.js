export const contractAddress = "0x936Ba26612b1dEcfDD7f58B34f4e09EA162f71A8"
export const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "Aqua_AlreadyVoted",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Aqua_BadDesignedVote",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Aqua_NoRight",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Aqua__AlreadyCalculated",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Aqua__CanAlreadyExists",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Aqua__LastStage",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Aqua__NotOwner",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Aqua__OutsideOfEnd",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Aqua__OutsideOfRegistration",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Aqua__OutsideOfVoting",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Aqua__VotAlreadyExists",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "changePeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCandidateLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getCandidateName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getInformation",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "candidateId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "candidateAddress",
              "type": "address"
            }
          ],
          "internalType": "struct Aqua.Candidate",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNumOfIncompleteVotes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getResults",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getState",
      "outputs": [
        {
          "internalType": "enum Aqua.Period",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalOfAVScore",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalVotersVote",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getVoterLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getWinnersbyId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isResults",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "setCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "setVoter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_candidate1VoteId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_candidate2VoteId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_candidate3VoteId",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]