'use client'

import { useState } from 'react';

export default function DatabaseSchemaDesigner() {
  const [tables, setTables] = useState([
    { name: 'users', columns: ['id INT PRIMARY KEY', 'email VARCHAR(255)', 'password VARCHAR(255)', 'created_at TIMESTAMP'] },
    { name: 'posts', columns: ['id INT PRIMARY KEY', 'user_id INT FOREIGN KEY', 'title VARCHAR(255)', 'content TEXT', 'created_at TIMESTAMP'] },
  ]);
  const [output, setOutput] = useState('');

  const generateSQL = () => {
    let sql = '';
    tables.forEach(table => {
      sql += `CREATE TABLE ${table.name} (\n`;
      sql += table.columns.map(col => `  ${col}`).join(',\n');
      sql += '\n);\n\n';
    });
    setOutput(sql);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  const patterns = [
    { name: 'User System', tables: 'users, sessions, roles', desc: 'Authentication and user management' },
    { name: 'Blog/CMS', tables: 'users, posts, comments, categories', desc: 'Content management system' },
    { name: 'Ecommerce', tables: 'users, products, orders, cart, payments', desc: 'Online store' },
    { name: 'Social', tables: 'users, posts, likes, follows, messages', desc: 'Social network features' },
    { name: 'SaaS', tables: 'users, subscriptions, plans, usage, invoices', desc: 'Subscription billing' },
  ];

  const columnTypes = [
    'INT', 'VARCHAR(255)', 'TEXT', 'BOOLEAN', 'TIMESTAMP', 'DATE', 'DECIMAL(10,2)', 'JSON', 'UUID', 'ENUM',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Database Schema Designer</h1>
      <p className="text-zinc-600">Design database schemas visually. Generate SQL CREATE TABLE statements. Common patterns for user systems, blogs, ecommerce.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Schema Patterns</h3>
        <div className="space-y-1 text-xs">
          {patterns.map((p) => (
            <div key={p.name} className="bg-white rounded p-2">
              <strong>{p.name}</strong>: {p.tables}
              <div className="text-zinc-500">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Sample Tables</h3>
        <div className="space-y-2">
          {tables.map((t, i) => (
            <div key={i} className="bg-white rounded p-2">
              <strong className="font-mono">{t.name}</strong>
              <div className="text-xs font-mono mt-1">
                {t.columns.map((c, j) => (
                  <div key={j} className="ml-2">{c}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={generateSQL} className="btn-primary mt-2">Generate SQL</button>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Generated SQL</h3>
        <textarea className="w-full h-40 p-3 border rounded font-mono text-sm bg-white" value={output} readOnly />
        <button onClick={copyOutput} className="btn-secondary mt-2">Copy SQL</button>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Column Types</h3>
        <div className="grid grid-cols-5 gap-2 text-xs">
          {columnTypes.map((t) => (
            <div key={t} className="bg-white rounded p-2 font-mono text-center">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="text-xs text-zinc-600">
          Primary keys: use UUID or auto-increment INT. Foreign keys: always name clearly. Indexes: on foreign keys, search columns. Timestamps: created_at, updated_at on every table. Naming: lowercase, underscores. Avoid: reserved words, too many columns. Normalize: reduce redundancy. Denormalize: for read performance.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Relationship Types</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2"><strong>One-to-One</strong>: user → profile</div>
          <div className="bg-white rounded p-2"><strong>One-to-Many</strong>: user → posts</div>
          <div className="bg-white rounded p-2"><strong>Many-to-Many</strong>: users ↔ roles (join table)</div>
          <div className="bg-white rounded p-2"><strong>Self-Reference</strong>: user → manager_id</div>
        </div>
      </div>
    </main>
  );
}