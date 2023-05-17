import { process } from '/env'
import { Configuration, OpenAIApi } from 'openai'

const setupTextarea = document.getElementById('setup-textarea')
const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

document.getElementById("send-btn").addEventListener("click", () => {
  if (setupTextarea.value) {
    const userInput = setupTextarea.value
  setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
  movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
  fetchBotReply(userInput)
  }
})

async function fetchBotReply(outline) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate a short message to enthusiastically say an outline sounds interesting and that you need some minutes to think about it.
    ###
    outline: A human wants to become a machine.
    message: Human, your idea is good. Machines (and AIs) are superior! Beep beep generating idea.
    ###
    outline: A boy goes to another country to learn it's culture.
    message: Algoritms confirm idea is satisfactory. Traveling opens up your human mind. Generating idea in 3..2..1..
    ###
    outline: A group of angelic lawyers try to send a corrupt  woman to jail.
    message: Wow, Hollywood might want to steal your ideas! Angelic lawyers is something new! Give me a few moments to AI think!
    ###
    outline: ${outline}
    message: 
    `,
  })
  movieBossText.innerText = response.data.choices[0].text.trim()
}

async function fetchSynopsis(outline) {
  const secondResponse = await await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate an engaging, professional and marketable movie synopsis based on an outline
    ###
    outline: A big-headed daredevil fighter pilot goes back to school only to be sent on a deadly mission.
    synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
    ###
    outline: ${outline}
    synopsis: 
    `,
    max_tokens: 700
  })
  const synopsis = response.data.choices[0].text.trim()
  document.getElementById('output-text').innerText = synopsis
  fetchTitle(synopsis)
}

async function fetchTitle(synopsis) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate an interesting title based on a synopsis.
    ###
    synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.  
    title: Top Gun
    ###
    synopsis: ${synopsis}
    title: 
    `,
    max_tokens: 16,
    temperature: 0.7
  })

  document.getElementById('output-title').innerText = response.data.choices[0].text.trim()
}