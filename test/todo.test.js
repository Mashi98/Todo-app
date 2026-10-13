'use strict';

const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const { TodoList } = require('../src/todo.js');

describe('TodoList', () => {
  let list;

  beforeEach(() => {
    list = new TodoList();
  });

  it('adds a todo with an id and done = false', () => {
    const todo = list.add('Buy milk');
    assert.deepEqual(todo, { id: 1, title: 'Buy milk', done: false });
  });

  it('trims whitespace from titles', () => {
    assert.equal(list.add('  Walk the dog  ').title, 'Walk the dog');
  });

  it('rejects empty or non-string titles', () => {
    assert.throws(() => list.add(''), /non-empty/);
    assert.throws(() => list.add('   '), /non-empty/);
    assert.throws(() => list.add(42), /non-empty/);
  });

  it('gives each todo a unique, increasing id', () => {
    const a = list.add('A');
    const b = list.add('B');
    assert.equal(b.id, a.id + 1);
  });

  it('marks a todo as complete', () => {
    const { id } = list.add('Write tests');
    assert.equal(list.complete(id).done, true);
  });

  it('throws when completing or removing an unknown id', () => {
    assert.throws(() => list.complete(99), /not found/);
    assert.throws(() => list.remove(99), /not found/);
  });

  it('removes a todo', () => {
    const { id } = list.add('Temporary');
    list.remove(id);
    assert.equal(list.list().length, 0);
  });

  it('filters by status', () => {
    const a = list.add('A');
    list.add('B');
    list.complete(a.id);
    assert.equal(list.list('done').length, 1);
    assert.equal(list.list('pending').length, 1);
    assert.equal(list.list('all').length, 2);
    assert.throws(() => list.list('nonsense'), /Unknown filter/);
  });

  it('calculates progress as a percentage', () => {
    assert.equal(list.progress(), 0);
    const a = list.add('A');
    list.add('B');
    list.add('C');
    list.add('D');
    list.complete(a.id);
    assert.equal(list.progress(), 25);
  });
});
