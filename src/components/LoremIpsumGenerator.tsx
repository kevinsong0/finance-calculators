'use client'

import { useState, useMemo } from 'react';

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentencesPerParagraph, setSentencesPerParagraph] = useState(4);
  const [type, setType] = useState('paragraphs');
  const [words, setWords] = useState(50);

  const loremWords = useMemo(() => [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
    'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
    'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
    'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
    'explicabo', 'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit',
    'fugit', 'consequuntur', 'magni', 'dolores', 'eos', 'ratione', 'sequi',
    'nesciunt', 'neque', 'porro', 'quisquam', 'dolorem', 'adipisci', 'numquam',
    'eius', 'modi', 'tempora', 'incidunt', 'magnam', 'quaerat',
  ], []);

  const generateSentence = () => {
    const length = Math.floor(Math.random() * 8) + 6;
    const sentenceWords = [];
    for (let i = 0; i < length; i++) {
      const word = loremWords[Math.floor(Math.random() * loremWords.length)];
      sentenceWords.push(i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
    }
    return sentenceWords.join(' ') + '.';
  };

  const generateParagraph = () => {
    const sentences = [];
    for (let i = 0; i < sentencesPerParagraph; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  const result = useMemo(() => {
    if (type === 'paragraphs') {
      return Array.from({ length: paragraphs }, () => generateParagraph()).join('\n\n');
    }
    if (type === 'sentences') {
      return Array.from({ length: paragraphs }, generateSentence).join(' ');
    }
    if (type === 'words') {
      const allWords = [];
      for (let i = 0; i < words; i++) {
        allWords.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      return allWords.join(' ');
    }
    return '';
  }, [paragraphs, sentencesPerParagraph, type, words, loremWords]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Lorem Ipsum Generator</h1>
      <p className="text-zinc-600">Generate placeholder text for designs, wireframes, and mockups. Lorem Ipsum provides filler content without distracting from layout evaluation.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Type</label>
          <div className="flex gap-2">
            <button onClick={() => setType('paragraphs')} className={`px-4 py-2 rounded ${type === 'paragraphs' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>Paragraphs</button>
            <button onClick={() => setType('sentences')} className={`px-4 py-2 rounded ${type === 'sentences' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>Sentences</button>
            <button onClick={() => setType('words')} className={`px-4 py-2 rounded ${type === 'words' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>Words</button>
          </div>
        </div>

        {type === 'paragraphs' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Paragraphs: {paragraphs}</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <button key={n} onClick={() => setParagraphs(n)} className={`px-3 py-1 rounded ${paragraphs === n ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        {type === 'paragraphs' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Sentences per Paragraph: {sentencesPerParagraph}</label>
            <div className="flex gap-2">
              {[3, 4, 5, 6, 7, 8].map((n) => (
                <button key={n} onClick={() => setSentencesPerParagraph(n)} className={`px-3 py-1 rounded ${sentencesPerParagraph === n ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        {type === 'words' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Words: {words}</label>
            <div className="flex gap-2">
              {[25, 50, 100, 150, 200, 300].map((n) => (
                <button key={n} onClick={() => setWords(n)} className={`px-3 py-1 rounded ${words === n ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        <button onClick={copyToClipboard} className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 font-medium">
          Copy Generated Text
        </button>
      </div>

      {result && (
        <div className="card bg-blue-50 p-4">
          <h3 className="font-medium mb-3">Generated Lorem Ipsum</h3>
          <div className="bg-white rounded p-3 text-sm leading-relaxed max-h-64 overflow-auto">
            {result}
          </div>
          <div className="text-xs text-zinc-500 mt-2">
            {type === 'paragraphs' && `${paragraphs} paragraphs, ${paragraphs * sentencesPerParagraph} sentences`}
            {type === 'sentences' && `${paragraphs} sentences`}
            {type === 'words' && `${words} words`}
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">What is Lorem Ipsum?</h3>
        <div className="bg-white rounded p-3 text-sm">
          Lorem Ipsum is placeholder text used since the 1500s. Derived from Latin literature by Cicero, it provides meaningless filler that doesn&apos;t distract viewers from layout evaluation. Standard in graphic design, web development, and publishing for mockups.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Wireframes:</span> Layout testing</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Mockups:</span> Design previews</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Prototypes:</span> Content filling</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Templates:</span> CMS placeholders</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">Typography:</span> Font testing</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">Print:</span> Magazine layouts</div>
          <div className="bg-white rounded p-2"><span className="text-indigo-600 font-medium">Web:</span> Responsive testing</div>
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">Apps:</span> UI screenshots</div>
        </div>
      </div>
    </main>
  );
}