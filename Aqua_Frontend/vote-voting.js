import { ethers } from "./ethers-5.1.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const votes = document.getElementById("votes")
votes.onclick = vote

window.addEventListener("load", getNames)

async function getNames() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const contract = new ethers.Contract(contractAddress, abi, provider)
        try {
            let length = await contract.getCandidateLength()
            length = length.toString()
            for (let count = 1; count <= length; count++) {
                const id_candidate = await contract.getCandidateName(count)
                var ul = document.getElementById("list")
                var li = document.createElement("li")
                li.appendChild(
                    document.createTextNode(`${count}.${id_candidate}`)
                )
                ul.appendChild(li)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

async function vote() {
    document.getElementById("error_code").innerHTML = ""
    const id_1vote = document.getElementById("_id1").value
    const id_2vote = document.getElementById("_id2").value
    const id_3vote = document.getElementById("_id3").value
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.vote(
                id_1vote,
                id_2vote,
                id_3vote
            )
        } catch (error) {
            errorFinder(error)
        }
    }
}

async function errorFinder(particular_error) {
    var substr0 = "User denied"
    var substr1 = "OutsideOfVoting"
    var substr2 = "AlreadyVoted"
    var substr3 = "NoRight"
    var substr4 = "BadDesignedVote"

    try {
        var p1 = particular_error.data.message
        //console.log(p1)
    } catch {}
    try {
        var p2 = particular_error.message
        //console.log(p2)
    } catch {}

    if (p2.includes(substr0)) {
        document.getElementById("error_code").innerHTML =
            "User denied the transaction."
    }
    if (p1.includes(substr1)) {
        document.getElementById("error_code").innerHTML =
            "Not the right period. You are not at voting period."
    }
    if (p1.includes(substr2)) {
        document.getElementById("error_code").innerHTML =
            "You have already voted."
    }
    if (p1.includes(substr3)) {
        document.getElementById("error_code").innerHTML =
            "You have no right to vote."
    }
    if (p1.includes(substr4)) {
        document.getElementById("error_code").innerHTML =
            "Wrong candidate ID, please approve a candidate ID that exists."
    }
}
