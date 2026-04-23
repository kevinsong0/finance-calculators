'use client'

import { useState } from 'react';

export default function GraphQLBuilder() {
  const [operation, setOperation] = useState('query');
  const [name, setName] = useState('GetUsers');
  const [fields, setFields] = useState('id\n  name\n  email');
  const [argumentsText, setArgumentsText] = useState('');
  const [variables, setVariables] = useState('');

  const generateGraphQL = () => {
    let gql = `${operation} ${name}`;

    if (variables.trim()) {
      // Parse variables format: $id: ID!, $limit: Int
      gql += `(${variables})`;
    }

    gql += ' {\n';

    const fieldLines = fields.split('\n').map(f => f.trim()).filter(f => f);
    if (argumentsText.trim()) {
      gql += `  ${fieldLines[0] || 'field'}(${argumentsText}) {\n`;
      if (fieldLines.length > 1) {
        fieldLines.slice(1).forEach(f => {
          gql += `    ${f}\n`;
        });
      }
      gql += '  }\n';
    } else {
      fieldLines.forEach(f => {
        gql += `  ${f}\n`;
      });
    }

    gql += '}';
    return gql;
  };

  const generateFetch = () => {
    const query = generateGraphQL();
    const escapedQuery = query.replace(/\n/g, '\\n');

    if (variables.trim()) {
      // Parse variables into JSON format
      const varsObj: Record<string, string> = {};
      variables.split(',').forEach(v => {
        const match = v.trim().match(/\$(\w+):\s*(\w+)/);
        if (match) {
          varsObj[match[1]] = 'value';
        }
      });

      const varsJson = JSON.stringify(varsObj);

      return `fetch('https://api.example.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: "${escapedQuery}",
    variables: ${varsJson}
  })
})
.then(res => res.json())
.then(data => console.log(data));`;
    }

    const singleLineQuery = query.replace(/\n/g, ' ');

    return `fetch('https://api.example.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: "${singleLineQuery}"
  })
})
.then(res => res.json())
.then(data => console.log(data));`;
  };

  const copyGraphQL = () => {
    navigator.clipboard.writeText(generateGraphQL());
  };

  const copyFetch = () => {
    navigator.clipboard.writeText(generateFetch());
  };

  const templates = [
    { op: 'query', name: 'GetUser', vars: '$id: ID!', args: 'id: $id', fields: 'id\nname\nemail\nstatus' },
    { op: 'query', name: 'GetUsers', vars: '$limit: Int, $offset: Int', args: 'limit: $limit, offset: $offset', fields: 'users {\n  id\n  name\n  email\n}' },
    { op: 'mutation', name: 'CreateUser', vars: '$name: String!, $email: String!', args: 'name: $name, email: $email', fields: 'id\nname\nemail' },
    { op: 'mutation', name: 'UpdateUser', vars: '$id: ID!, $data: UserInput!', args: 'id: $id, data: $data', fields: 'id\nname\nemail' },
  ];

  const loadTemplate = (t: typeof templates[0]) => {
    setOperation(t.op);
    setName(t.name);
    setVariables(t.vars);
    setArgumentsText(t.args);
    setFields(t.fields);
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">GraphQL Query Builder</h1>
      <p className="text-zinc-600">Build GraphQL queries and mutations. Generate queries with variables, arguments, and nested fields. Export as GraphQL and fetch code for API integration.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Quick Templates</label>
          <div className="flex gap-2">
            {templates.map((t, i) => (
              <button key={i} onClick={() => loadTemplate(t)} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm">
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Operation</label>
            <div className="flex gap-2">
              {['query', 'mutation'].map((op) => (
                <button key={op} onClick={() => setOperation(op)} className={`px-4 py-2 rounded ${operation === op ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {op}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Operation Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="GetUsers" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Variables ($var: Type)</label>
          <input type="text" value={variables} onChange={e => setVariables(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="$id: ID!, $limit: Int" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Arguments (passed to field)</label>
          <input type="text" value={argumentsText} onChange={e => setArgumentsText(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="id: $id, limit: $limit" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Fields (one per line, nested with braces)</label>
          <textarea value={fields} onChange={e => setFields(e.target.value)} className="w-full h-24 p-3 border rounded font-mono text-sm resize-none" placeholder="id\nname\nemail" />
        </div>
      </div>

      <div className="card bg-blue-50 p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Generated GraphQL</h3>
          <button onClick={copyGraphQL} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
        </div>
        <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto">{generateGraphQL()}</pre>
      </div>

      <div className="card bg-zinc-50 p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">fetch (JavaScript)</h3>
          <button onClick={copyFetch} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
        </div>
        <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto max-h-32 whitespace-pre-wrap">{generateFetch()}</pre>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">GraphQL Concepts</h3>
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Query</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Fetch data (read)</div>
              <div>Like GET in REST</div>
              <div>Specify fields needed</div>
              <div>Nested selections</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Mutation</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Modify data (write)</div>
              <div>Like POST/PUT/DELETE</div>
              <div>Returns modified data</div>
              <div>Can create, update, delete</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Variables</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>$var: Type syntax</div>
              <div>Passed separately from query</div>
              <div>Dynamic values</div>
              <div>Types: ID, String, Int, Boolean</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Fields</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Select what you need</div>
              <div>No over-fetching</div>
              <div>Nested object fields</div>
              <div>Arrays and fragments</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}