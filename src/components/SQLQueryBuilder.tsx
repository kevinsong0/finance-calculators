'use client'

import { useState } from 'react';

export default function SQLQueryBuilder() {
  const [queryType, setQueryType] = useState('select');
  const [table, setTable] = useState('users');
  const [columns, setColumns] = useState('*');
  const [conditions, setConditions] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [limit, setLimit] = useState('');
  const [insertValues, setInsertValues] = useState('');

  const generateSQL = () => {
    if (queryType === 'select') {
      let sql = `SELECT ${columns} FROM ${table}`;
      if (conditions) sql += ` WHERE ${conditions}`;
      if (orderBy) sql += ` ORDER BY ${orderBy}`;
      if (limit) sql += ` LIMIT ${limit}`;
      return sql + ';';
    } else if (queryType === 'insert') {
      const cols = columns === '*' ? '' : `(${columns.split(',').join(', ')})`;
      const vals = insertValues ? ` VALUES (${insertValues})` : '';
      return `INSERT INTO ${table}${cols}${vals};`;
    } else if (queryType === 'update') {
      let sql = `UPDATE ${table} SET ${conditions}`;
      return sql + ';';
    } else if (queryType === 'delete') {
      let sql = `DELETE FROM ${table}`;
      if (conditions) sql += ` WHERE ${conditions}`;
      return sql + ';';
    }
    return '';
  };

  const copySQL = () => {
    navigator.clipboard.writeText(generateSQL());
  };

  const templates = [
    { type: 'select', table: 'users', columns: 'id, name, email', conditions: 'status = "active"', orderBy: 'created_at DESC', limit: '10' },
    { type: 'select', table: 'products', columns: '*', conditions: 'price > 100 AND category = "electronics"', orderBy: 'price ASC', limit: '20' },
    { type: 'insert', table: 'orders', columns: 'user_id, product_id, quantity', conditions: '', insertValues: '1, 42, 2' },
    { type: 'update', table: 'users', columns: '', conditions: 'email = "new@example.com" WHERE id = 1' },
    { type: 'delete', table: 'logs', columns: '*', conditions: 'created_at < "2023-01-01"', orderBy: '', limit: '' },
  ];

  const loadTemplate = (t: typeof templates[0]) => {
    setQueryType(t.type);
    setTable(t.table);
    setColumns(t.columns || '*');
    setConditions(t.conditions || '');
    setOrderBy(t.orderBy || '');
    setLimit(t.limit || '');
    setInsertValues(t.insertValues || '');
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">SQL Query Builder</h1>
      <p className="text-zinc-600">Generate SQL queries for SELECT, INSERT, UPDATE, DELETE operations. Build queries with conditions, ordering, and limits. Quick templates for common database operations.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Query Type</label>
          <div className="flex gap-2">
            {['select', 'insert', 'update', 'delete'].map((type) => (
              <button key={type} onClick={() => setQueryType(type)} className={`px-3 py-2 rounded ${queryType === type ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Quick Templates</label>
          <div className="flex gap-2">
            {templates.map((t, i) => (
              <button key={i} onClick={() => loadTemplate(t)} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm capitalize">
                {t.type} {t.table}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Table Name</label>
            <input type="text" value={table} onChange={e => setTable(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="users" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Columns</label>
            <input type="text" value={columns} onChange={e => setColumns(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="* or id, name, email" />
          </div>
        </div>

        {queryType === 'select' && (
          <>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">WHERE Conditions</label>
              <input type="text" value={conditions} onChange={e => setConditions(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="status = 'active'" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">ORDER BY</label>
                <input type="text" value={orderBy} onChange={e => setOrderBy(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="created_at DESC" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">LIMIT</label>
                <input type="text" value={limit} onChange={e => setLimit(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="10" />
              </div>
            </div>
          </>
        )}

        {queryType === 'insert' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">VALUES</label>
            <input type="text" value={insertValues} onChange={e => setInsertValues(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="1, 'John', 'john@example.com'" />
          </div>
        )}

        {queryType === 'update' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">SET ... WHERE</label>
            <input type="text" value={conditions} onChange={e => setConditions(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="name = 'Jane' WHERE id = 1" />
          </div>
        )}

        {queryType === 'delete' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">WHERE Conditions</label>
            <input type="text" value={conditions} onChange={e => setConditions(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="id = 1" />
          </div>
        )}
      </div>

      <div className="card bg-blue-50 p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Generated SQL</h3>
          <button onClick={copySQL} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
        </div>
        <pre className="bg-white rounded p-3 font-mono text-sm">{generateSQL()}</pre>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SQL Query Types</h3>
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">SELECT</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Retrieve data</div>
              <div>SELECT columns FROM table</div>
              <div>WHERE filters rows</div>
              <div>ORDER BY sorts results</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">INSERT</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Add new rows</div>
              <div>INSERT INTO table</div>
              <div>Specify columns</div>
              <div>VALUES provide data</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">UPDATE</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Modify existing rows</div>
              <div>UPDATE table SET</div>
              <div>Always use WHERE</div>
              <div>Without WHERE updates all</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">DELETE</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Remove rows</div>
              <div>DELETE FROM table</div>
              <div>WHERE specifies rows</div>
              <div>Without WHERE deletes all</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SQL Safety Tips</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">Always WHERE:</span> For UPDATE/DELETE</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Use LIMIT:</span> Prevent accidental mass</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Test first:</span> Run SELECT before</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Transactions:</span> Wrap modifications</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Backup:</span> Before major changes</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">Index:</span> WHERE columns indexed</div>
        </div>
      </div>
    </main>
  );
}