import { ethers } from "./ethers-5.1.esm.min.js"
import { abi, contractAddress } from "./constants.js"

window.addEventListener("load", genesisAddress)
window.addEventListener("load", genesisResults)

async function genesisResults() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const contract = new ethers.Contract(contractAddress, abi, provider)
        try {
            const result = await contract.isResults()
            if (result == 1) {
                document.getElementById("gen").innerHTML = "Results"
                document.getElementById("logo").src =
                    "img/AquaLogo - Done(2).png"
            }
        } catch (error) {
            console.log(error)
        }
    }
}

async function genesisAddress() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const accounts = await ethereum.request({ method: "eth_accounts" })
            if (!accounts.length) {
                window.location = "index.php"
            }
            const provider = new ethers.providers.Web3Provider(
                window.ethereum,
                "any"
            )
            await provider.send("eth_requestAccounts", [])
            const signer = provider.getSigner()
            let address = await signer.getAddress()
            address = `${address.substring(0, 8)}...`
            document.getElementById("addresid").innerHTML = address
        } catch (error) {
            console.log(error)
        }
    }
}

window.ethereum.on("accountsChanged", genesisAddress)
