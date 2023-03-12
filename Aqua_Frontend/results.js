import { ethers } from "./ethers-5.1.esm.min.js"
import { abi, contractAddress } from "./constants.js"
import "./Chart.js.2.5.0.Chart.min.js"

const colours = [
    "#F7CAC9",
    "#92A8D1",
    "#88B04B",
    "#34568B",
    "#955251",
    "#B565A7",
    "#009B77",
    "#DD4124",
    "#D65076",
    "#45B8AC",
    "#EFC050",
    "#5B5EA6",
    "#9B2335",
    "#DFCFBE",
    "#55B4B0",
    "#E15D44",
    "#7FCDCD",
    "#BC243C",
]

window.addEventListener("load", genesisWinners)

var xValues = []
var yValues = []
var barColors = []

async function genesisWinners() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const contract = new ethers.Contract(contractAddress, abi, provider)
        try {
            const winner1 = await contract.getWinnersbyId(0)
            const winner2 = await contract.getWinnersbyId(1)
            const winner3 = await contract.getWinnersbyId(2)
            document.getElementById("win1").innerHTML = winner1
            document.getElementById("win2").innerHTML = winner2
            document.getElementById("win3").innerHTML = winner3
            let winner1Name = await contract.getCandidateName(winner1)
            let winner2Name = await contract.getCandidateName(winner2)
            let winner3Name = await contract.getCandidateName(winner3)
            if (winner2 == 0) {
                winner2Name = ""
            }
            if (winner3 == 0) {
                winner3Name = ""
            }
            document.getElementById("win1name").innerHTML = `${winner1Name}:`
            document.getElementById("win2name").innerHTML = `${winner2Name}:`
            document.getElementById("win3name").innerHTML = `${winner3Name}:`
            genesis()
        } catch (error) {
            console.log(error)
        }
    }
}

async function genesis() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const contract = new ethers.Contract(contractAddress, abi, provider)
        try {
            let length = await contract.getCandidateLength()
            length = length.toString()

            const VoterLength = await contract.getVoterLength()
            document.getElementById("VotLen").innerHTML = VoterLength

            const VoterVot = await contract.getTotalVotersVote()
            document.getElementById("VotVot").innerHTML = VoterVot

            const sumOfApprovals = await contract.getTotalOfAVScore()
            document.getElementById("UniqueApprovals").innerHTML =
                sumOfApprovals

            let AppZero = await contract.getNumOfIncompleteVotes()
            //AppZero = parseInt(AppZero._hex, 16)
            document.getElementById("Approvalsofzero").innerHTML = AppZero

            // let totalVotes = await contract.getTotalVotes()
            // totalVotes = parseInt(totalVotes._hex, 16)

            for (let count = 1; count <= length; count++) {
                const information = await contract.getInformation(count)

                const random = Math.floor(Math.random() * colours.length)
                let name = `${information.name}:`

                // if (count == 0) {
                //     name = "Μη-Αποδοχή:"
                // }
                let votecount = parseInt(information.voteCount._hex, 16)
                // let percentofVotes = `${Math.round(
                //     (votecount * 100) / totalVotes
                // )}%`
                var table = document.getElementById("poll")
                var td = document.createElement("td")
                td.appendChild(document.createTextNode(name))
                td.setAttribute("class", "democlass")
                table.appendChild(td)
                var td = document.createElement("td")
                td.appendChild(document.createTextNode(votecount))
                table.appendChild(td)
                var td = document.createElement("td")
                // td.appendChild(document.createTextNode(percentofVotes))
                // table.appendChild(td)
                var tr = document.createElement("tr")
                table.appendChild(tr)

                name = name.slice(0, -1)
                xValues.push(name)
                yValues.push(votecount)
                barColors.push(colours[random])
            }
            xValues.push("")
            yValues.push("")
            barColors.push("green")

            new Chart("myChart", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [
                        {
                            backgroundColor: barColors,
                            data: yValues,
                        },
                    ],
                },

                options: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Aqua Elections",
                    },
                    scales: {
                        xAxes: [
                            {
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: "Candidates",
                                },
                            },
                        ],
                        yAxes: [
                            {
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: "AV-score",
                                },
                                ticks: {
                                    stepSize: 1, // tick
                                },
                            },
                        ],
                    },
                },
            })
        } catch (error) {
            console.log(error)
        }
    }
}
