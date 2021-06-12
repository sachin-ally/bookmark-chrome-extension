let leadsArray = []

let inputBtn = document.getElementById("input-btn")
let input = document.getElementById('input-el')
const leads = document.getElementById("leads-container")
const saveTabBtn = document.getElementById('save-tab-btn')
const clearLeadsButton = document.getElementById('clear-leads-btn')


if(window.localStorage.getItem('leadsArray') === null) {
    window.localStorage.setItem('leadsArray', '[]')
} else {
    leadsArray = JSON.parse(window.localStorage.getItem('leadsArray'))
}

const openUrl = (url) => {
    window.open(url, '_blank')
}

const showLeads = () => {
    leads.innerHTML = ''
    leadsArray.forEach(lead => {
        const newLead = document.createElement('a')
        newLead.setAttribute('href', lead) 
        newLead.setAttribute('alt', "lead")
        newLead.addEventListener('click', () => openUrl(lead))
        newLead.innerText = lead
        leads.appendChild(newLead)
    })
}

showLeads()

inputBtn.onclick = (e) => {
    if(input.value === "" || input.value == null) {
        return
    }
    leadsArray = JSON.parse(window.localStorage.getItem('leadsArray'))
    leadsArray.includes(input.value) ?
    alert("Lead already exists") :
    leadsArray.unshift(input.value)
    window.localStorage.setItem('leadsArray', JSON.stringify(leadsArray))
    showLeads()
    input.value = ''
}

saveTabBtn.onclick = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        input.value = tabs[0].url
        inputBtn.click()
    })
}

clearLeadsButton.ondblclick = () => {
    input.value = ''
    window.localStorage.setItem('leadsArray', "[]")
    leads.innerHTML = ''
}

