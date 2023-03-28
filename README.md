# Savee
A GenAI tool that helps fight online fake content with fact-based generations

## Demo
![savee_demo](https://user-images.githubusercontent.com/246724/228312015-fb7eece0-0c1e-4ed8-be34-e7bd7550bedf.gif)


<!-- ## Main project page (links, resources, etc):
- [Notion](https://storm-vanilla-477.notion.site/Savee-2bec35f4769c41a78f01ca21eb5f1c7d) -->

## Context:
- Background:
    - Began as an idea for Spark-2023 hackathon, a hackathon aimed for Holocaust memorial, fighting fake content and antisemitism
    - We grouped as couple random people with same intent
    - We met with key people including historians, youth ambassadors and other people who care and actively searching and reactive to hateful posts online.
        - This is mostly manual process of discovery, although some are using online tools for monitoring and discovery.
        - The number of people actively responding compared to the amount of written content is negligible.
        - The numbers are expected to arise dramatically with the introduction of Generative AI.
    - We understood we could combine GenerativeAI with historical documents containing historical facts to fight fake or misleading online posts. The focus is not to convince the person who wrote it, but the audience around the post.
    - Won first place on a minimal working demo. The tool was trained on the Wikipedia page about the Holocaust and provided accurate answers.
    - After closely inspecting how the minimal demo could transform into actual, public available tool, we understood:
        - It has to support larger sources of facts and not rely on Wikipedia
        - It has to be open-source
        - It has to be completed before national Holocaust day (18-04-23)
- Goals:
    - **Create a simple tool that can analyze social media content (on-demand, per post) and suggest a fact-based response with ease**
    - Create a network of key people who want to see this tool alive and use it. Ask them to promote us and the tool
        - Reach online and traditional news agencies to promote the project
        - Reach morning tv shows to hows and promote
    - Achieve a working tool by 16-04-23
- Plan & roles:
    - Designer & product - handle landing-page, messaging, demo and install page
    - Biz/Ops - handle strategical connections, PR, market validation and “sell” the tool
    - FE - create chrome extension and FE part of the app
    - BE - create app dedicated endpoints for processing Q&A, uploading files and managing facts (add remove facts)
    - AI - Facilitate process of pre-processing of the unstructured data into structured list of facts, and design a utility bot that answers based on those facts (and maybe references back, tbd)
    - Meta - promote the project in the local community, bring more contributors, etc
    - PM - Manage the tasks and milestones, make decisions
- Team:
    - [Elya Livshitz](https://www.linkedin.com/in/elyalivshitz/) - AI
    - [Ofer Nidam](https://www.linkedin.com/in/ofer-nidam/) - Biz/Ops
    - [Ori Kessler](https://www.linkedin.com/in/ori-kessler/) - FS
    - [Yoni Kessler](https://www.linkedin.com/in/yoni-kessler-777030258/) - Design/FS
    - [Stav Cohen Lasri](https://www.linkedin.com/in/stav-cohen-lasri/) - Product
    - [Ido Schwartz](https://www.linkedin.com/in/ido-schwartz/) - FS
    - [Erez Tepper](https://www.linkedin.com/in/ereztep/) - AI/Meta
    - Mentors/collaborators/partners:
        - [Yossi Klein](https://www.linkedin.com/in/ACoAAAZSxHkBNwIUF919EsK1rwOojhVSYMi-IgU)
        - [Ram Yonish](https://www.linkedin.com/in/ACoAAACCIfcB2cRhc0PmgfBvECt9v9QZkFLQ7BQ)
        - @בית לוחמי הגטאות (Yaron)

## How does it work:
<img width="1060" alt="image" src="https://user-images.githubusercontent.com/246724/228316892-5b975737-1559-4771-8790-16b7a6292b95.png">

### Preprocess:
- "Facts managers" select relevant historical documents containing unstructured texts, multilingual, that describe historical events related to the Holocaust.
- They upload those files to Savee back-office webapp, it stores the files in the cloud
- Each file being "compressed" from large blobs of unstructured text into smaller list of concise fact list
- Each group of facts are aggregated or chunked into small chunks
- Performs embedding process for each chunk and stores each chunk with the embedding vector. 

### Install:
- Users on the internet see the landing page, navigate to install instructions page
- Install the Chrome extension

### Query:
- Users (aka "Ambassadors") navigate to a page on social media that contains fake or wrong content
- User clicks on the extension and selects the post
- The extension grabs the text and sends it to Botify, a purpose-specific bot for factual Q&A

### Response generation:
- Botify takes the text, embeds it and searches in the DB for facts semantically related to the text (using embedding vectors).
- Top k results taken and composed into GPT prompt
- Prompt is sent to OpenAI for completion, in such way that the response will be only based on the provided facts and nothing else.
- Resulted text is sent back to the user


## Develop
### Setup
1. Clone locally
1. Run `$ yarn install`

### Start:
1. Run `$ yarn start`
2. Open browser on `http://0.0.0.0:3010/`
* Check main package.json for more commands

## Contribute

Contributions welcome! Read the [contribution guidelines](CONTRIBUTING.md) first and submit a Pull Request after Fork this repository.  
Wanna talk? Chat with us [here](https://chat.whatsapp.com/Ck7JdQx1krlINNLMLmd3hr).

## Contact
Please use GitHub [Issues](./issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) to contact us.

