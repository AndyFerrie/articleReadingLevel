const PORT = 8000;
const axios = require('axios');
const rs = require('text-readability')
const express = require('express');

const app = express();

const url = 'http://content.guardianapis.com/search?order-by=newest&show-fields=bodyText&q=politics&api-key=test';

axios(url).then(response => {
    const data = response.data.response.results;
    const articles = [];

    for (let i = 0; i < data.length; i++) {
        const article = data[i].fields.bodyText;
        const words = rs.lexiconCount(article, removePunctuation=true);
        const syllables = rs.syllableCount(article);
        const fleschReadingEase = rs.fleschReadingEase(article);
        const fleschKincaidGrade = rs.fleschKincaidGrade(article);
        const fogScale = rs.gunningFog(article);
        const smogIndex = rs.smogIndex(article);
        const automatedReadabilityIndex = rs.automatedReadabilityIndex(article);
        const colemanLiauIndex = rs.colemanLiauIndex(article);
        const linsearWriteFormula = rs.linsearWriteFormula(article);
        const daleChallReadabilityScore = rs.daleChallReadabilityScore(article);
        const difficultWords = rs.difficultWords(article);
        articles.push({
            article,
            words,
            syllables,
            fleschReadingEase,
            fleschKincaidGrade,
            fogScale,
            smogIndex,
            automatedReadabilityIndex,
            colemanLiauIndex,
            linsearWriteFormula,
            daleChallReadabilityScore,
            difficultWords,
        });
    }

console.log(articles);

}).catch(err => console.log(err));

app.listen(PORT, () => console.log('Server running on port ' + PORT));