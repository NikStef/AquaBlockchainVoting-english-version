import { ethers } from "./ethers-5.1.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const CandidateLength = document.getElementById("CandidateLength")
CandidateLength.onclick = getCandidateLength

const VoterLength = document.getElementById("VoterLength")
VoterLength.onclick = getVoterLength

const period = document.getElementById("period")
period.onclick = getState

const setCandidateButton = document.getElementById("setCandidateButton")
setCandidateButton.onclick = setCandidate

const setVoterButton = document.getElementById("setVoterButton")
setVoterButton.onclick = setVoter

const ChangePeriod = document.getElementById("ChangePeriod")
ChangePeriod.onclick = ChangePrd

const Winner = document.getElementById("Winner")
Winner.onclick = getWinner

async function setCandidate() {
    document.getElementById("error_code").innerHTML = ""
    const address = document.getElementById("_addressCandidate").value
    const name = document.getElementById("_nameCandidate").value
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const contractResponse = await contract.setCandidate(address, name)
        } catch (error) {
            errorFinder(error)
        }
    }
}

async function setVoter() {
    document.getElementById("error_code").innerHTML = ""
    const address = document.getElementById("_addressVoter").value
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const contractResponse = await contract.setVoter(address)
        } catch (error) {
            errorFinder(error)
        }
    }
}

async function getCandidateLength() {
    document.getElementById("error_code").innerHTML = ""
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const length = await contract.getCandidateLength()

            document.getElementById("view-only").elements[
                "candidatelengthresult"
            ].value = `The number of candidates is: ${length.toString()}`
        } catch (error) {
            console.log(error)
        }
    }
}

async function getState() {
    document.getElementById("error_code").innerHTML = ""
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            var per
            const stage = await contract.getState()

            if (stage == 0) {
                per = "Initialize"
            } else if (stage == 1) {
                per = "Register"
            } else if (stage == 2) {
                per = "Voting"
            } else {
                per = "End"
            }

            document.getElementById("view-only").elements[
                "periodResult"
            ].value = `Period is: ${per}`
        } catch (error) {
            console.log(error)
        }
    }
}

async function getVoterLength() {
    document.getElementById("error_code").innerHTML = ""
    //console.log(`Passing`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const length = await contract.getVoterLength()
            document.getElementById("view-only").elements[
                "voterlengthresult"
            ].value = `The number of voters is: ${length.toString()}`
        } catch (error) {
            console.log(error)
        }
    }
}

async function ChangePrd() {
    document.getElementById("error_code").innerHTML = ""
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            await contract.changePeriod()
        } catch (error) {
            errorFinder(error)
        }
    }
}

async function getWinner() {
    document.getElementById("error_code").innerHTML = ""
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            await contract.getResults()
            window.location.href = "./results.php"
        } catch (error) {
            errorFinder(error)
        }
    }
}

async function errorFinder(particular_error) {
    var substr0 = "User denied"
    var substr1 = "OutsideOfEnd"
    var substr2 = "NotOwner"
    var substr3 = "OutsideOfRegistration"
    var substr4 = "CanAlreadyExists"
    var substr5 = "VotAlreadyExists"
    var substr6 = "LastStage"
    var substr7 = "AlreadyCalculated"

    try {
        var p1 = particular_error.data.message
    } catch {}
    try {
        var p2 = particular_error.message
    } catch {}
    if (p2.includes(substr0)) {
        document.getElementById("error_code").innerHTML =
            "User denied the transaction"
    }
    if (p1.includes(substr1)) {
        document.getElementById("error_code").innerHTML =
            "Not the right period. You are not at ending period."
    }
    if (p1.includes(substr2)) {
        document.getElementById("error_code").innerHTML =
            "Only the user that deployed Aqua has this right."
    }
    if (p1.includes(substr3)) {
        document.getElementById("error_code").innerHTML =
            "Not the right period. You are not at registration period."
    }
    if (p1.includes(substr4)) {
        document.getElementById("error_code").innerHTML =
            "Candidate already exists."
    }
    if (p1.includes(substr5)) {
        document.getElementById("error_code").innerHTML =
            "Voter already exists."
    }
    if (p1.includes(substr6)) {
        document.getElementById("error_code").innerHTML =
            "You are already at the last period."
    }
    if (p1.includes(substr7)) {
        document.getElementById("error_code").innerHTML =
            "The results have already been calculated."
    }
}
