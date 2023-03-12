import { ethers } from "./ethers-5.1.esm.min.js"

const connectButton = document.getElementById("connectButton")
connectButton.onclick = connect

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const provider = new ethers.providers.Web3Provider(
                window.ethereum,
                "any"
            )
            await provider.send("eth_requestAccounts", [])
            window.location = "u_index.php"
        } catch (error) {
            console.log(error)
            errorFinder(error)
        }
    } else {
        connectButton.innerHTML = "Παρακαλώ κατεβάστε το Metamask."
    }
}

async function errorFinder(particular_error) {
    var substr0 = "User rejected"
    var substr1 = "already pending"
    try {
        var p2 = particular_error.message
    } catch {}

    if (p2.includes(substr0)) {
        document.getElementById("error_code").innerHTML =
            "User denied the transaction."
    }
    if (p2.includes(substr1)) {
        document.getElementById("error_code").innerHTML =
            "There is already a request check your Metamask extension."
    }
}
