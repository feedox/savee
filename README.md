# Savee
A way to store facts for future fact-checking apps

## Demo
![savee_demo](https://user-images.githubusercontent.com/246724/228312015-fb7eece0-0c1e-4ed8-be34-e7bd7550bedf.gif)


## Main project page (links, resources, etc):
- [Notion](https://storm-vanilla-477.notion.site/Savee-2bec35f4769c41a78f01ca21eb5f1c7d)

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

## Contact
Please use GitHub [Issues](./issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) to contact us.

