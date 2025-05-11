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
const ori =
{
    name: {
        first:
            [
                "ori",
                "ˈoʊ.ɹi",
                "gold"
            ],
        middle:
            [
                "del",
                "dɛl",
                "of the"
            ],
        last:
            [
                "corvo",
                "ˈkɔɹ.voʊ",
                "raven"
            ]
    }
};
const mermaidChart = {
    nodes: [
        `00(("\`${capitalize(ori.name.first[0])} ${ori.name.middle[0]} ${capitalize(ori.name.last[0])}
            #8595;
            /${ori.name.first[1]} ${ori.name.middle[1]}‿${ori.name.last[1]}/\`"));`,
        `01("\`${capitalize(ori.name.first[0])}
            #8595;
            /${ori.name.first[1]}/\`");`,
        `02("\`${ori.name.middle[0]} ${capitalize(ori.name.last[0])}
            #8595;
            /${ori.name.middle[1]}‿${ori.name.last[1]}/\`");`,
        `03("\`${capitalize(ori.name.middle[0])}
            #8595;
            /${ori.name.middle[1]}/\`");`,
        `04("\`${capitalize(ori.name.last[0])}
            #8595;
            /${ori.name.last[1]}/\`");`,
        `05("\`Di
            #8595;
            /di/\`");`,
        `06("\`Il
            #8595;
            /il/\`");`,
        `07("\`#34;${capitalize(ori.name.first[2])}#34;\`");`,
        `08("\`#34;${capitalize(ori.name.middle[2]).split(' ')[0]}#34;\`");`,
        `09("\`#34;${capitalize(ori.name.middle[2]).split(' ')[1]}#34;\`");`,
        `10("\`#34;${capitalize(ori.name.last[2])}#34;\`");`,
        `11{"\`#34;${[ori.name.first[2], ori.name.middle[2], ori.name.last[2]].map(capitalize).join(' ')}#34;
            #8595;
            #34;${capitalize(ori.name.middle[2]).split(' ')[1]} ${capitalize(ori.name.last[2])}'s ${capitalize(ori.name.first[2])}#34;\`"};`
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
    '---',
    `title: ${capitalize([ori.name.first[0]])} ${[ori.name.middle[0]]} ${capitalize([ori.name.last[0]])}`,
    '---',

    'flowchart LR;',

    chartLabel('Nodes'),
    mermaidFormat(mermaidChart.nodes),

    chartLabel('Connections'),
    mermaidFormat(mermaidChart.connections),
].join('\n')
    }`;
Object.values(ori.name).forEach(
    (item) => {
        let Name = item[0];
        if (Name !== ori.name.middle[0]) {
            Name = capitalize(Name)
        };
    }
);
document.title = `${[
    capitalize(ori.name.first[0]),
    ori.name.middle[0],
    capitalize(ori.name.last[0])
].join(' ')}`;
const description = document.createElement('div');
flowChart = flowChart
    .replace(/ {2,}/g, '')
    .replace(/\n{2,}/g, '\n')
const nameChart = document.createElement('pre');
nameChart.classList.add('mermaid');
nameChart.innerHTML = `${flowChart}`;
description.appendChild(nameChart);
document.body.appendChild(description);
const commentContent = Array.from(description.children)
    .map(child => child.innerHTML)
    .join('\n');
console.log(commentContent);
const newComment = document.createComment(commentContent);
document.body.appendChild(newComment)