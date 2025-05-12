fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load JSON file');
        }
        return response.json();
    })
    .then(character => {
        function capitalize(input) {
            const regExp = /([^a-z]*)([a-z])(.*)/i;
            const capitalizeWord = (word) => {
                const match = word.toLowerCase().match(regExp);
                if (!match) return word;
                const [, prefix, firstLetter, suffix] = match;
                return prefix + firstLetter.toUpperCase() + suffix;
            };
            if (typeof input === 'string') {
                return input
                    .split(' ')
                    .map(capitalizeWord)
                    .join(' ');
            };
            return input.map(capitalizeWord);
        };
        const mermaidChart = {
            nodes: [
                `00(("\`${capitalize(character.name.first[0])} ${character.name.middle[0]} ${capitalize(character.name.last[0])}
            #8595;
            /${character.name.first[1]} ${character.name.middle[1]}‿${character.name.last[1]}/\`"));`,
                `01("\`${capitalize(character.name.first[0])}
            #8595;
            /${character.name.first[1]}/\`");`,
                `02("\`${character.name.middle[0]} ${capitalize(character.name.last[0])}
            #8595;
            /${character.name.middle[1]}‿${character.name.last[1]}/\`");`,
                `03("\`${capitalize(character.name.middle[0])}
            #8595;
            /${character.name.middle[1]}/\`");`,
                `04("\`${capitalize(character.name.last[0])}
            #8595;
            /${character.name.last[1]}/\`");`,
                `05("\`Di
            #8595;
            /di/\`");`,
                `06("\`Il
            #8595;
            /il/\`");`,
                `07("\`#34;${capitalize(character.name.first[2])}#34;\`");`,
                `08("\`#34;${capitalize(character.name.middle[2]).split(' ')[0]}#34;\`");`,
                `09("\`#34;${capitalize(character.name.middle[2]).split(' ')[1]}#34;\`");`,
                `10("\`#34;${capitalize(character.name.last[2])}#34;\`");`,
                `11{"\`#34;${[character.name.first[2], character.name.middle[2], character.name.last[2]].map(capitalize).join(' ')}#34;
            #8595;
            #34;${capitalize(character.name.middle[2]).split(' ')[1]} ${capitalize(character.name.last[2])}'s ${capitalize(character.name.first[2])}#34;\`"};`
            ],
            connections: [
                `00===01;`,
                `00===02;`,
                `01=====07;`,
                `02===03;`,
                `02===04;`,
                `03===05;`,
                `03===06;`,
                `04====10;`,
                `05===08;`,
                `06===09;`,
                `07===11;`,
                `08===11;`,
                `09===11;`,
                `10===11;`
            ]
        };
        function mermaidFormat(userInput) {
            let output = userInput.join('\n')
            return output
        };
        const chartCommentLength = 100;
        function chartLabel(label = '%', edge = '%%') {
            if (label !== '%') {
                edge = '=';
            };
            const length = chartCommentLength - label.length - 6;
            const edges = [
                edge.repeat(Math.floor(length / 2)),
                edge.repeat(Math.ceil(length / 2))
            ];
            output = `%% ${edges[0]} ${label} ${edges[1]} %%`;
            output = output.replace(/(%+)? (%+) (%+)?/g, '%%$1$2$3%%')
            return output;
        };
        let flowChart = `${[
            'flowchart LR;',
            mermaidFormat(mermaidChart.nodes),
            mermaidFormat(mermaidChart.connections),
        ].join('\n')
            }`;
        Object.values(character.name).forEach(
            (item) => {
                let Name = item[0];
                if (Name !== character.name.middle[0]) {
                    Name = capitalize(Name)
                };
            }
        );
        document.title = `${[
            capitalize(character.name.first[0]),
            character.name.middle[0],
            capitalize(character.name.last[0])
        ].join(' ')}`;
        const head = document.createElement('h1');
        head.innerHTML = `${capitalize(character.name.first[0])} ${character.name.middle[0]} ${capitalize(character.name.last[0])}`;
        flowChart = flowChart
            .replace(/ {2,}/g, '')
            .replace(/\n{2,}/g, '\n')
        const nameChart = document.createElement('pre');
        nameChart.classList.add('mermaid');
        nameChart.innerHTML = `${flowChart}`;
        let mdText = `## Info on ${capitalize(character.name.first[0])}
${character.md}`;
        const markdown = document.createElement('div');
        markdown.innerHTML = marked.parse(mdText);
        [
            head,
            nameChart,
            markdown
        ].forEach(element => {
            document.body.appendChild(element)
        });
        window.mermaid.run();
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });