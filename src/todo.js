'use strict';

/**
 * A small in-memory todo list.
 * Each todo looks like: { id: 1, title: 'Buy milk', done: false }
 */
class TodoList {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  add(title) {
    if (typeof title !== 'string' || title.trim() === '') {
      throw new Error('Title must be a non-empty string');
    }
    const todo = { id: 0, title: title.trim(), done: false };
    this.todos.push(todo);
    return todo;
  }

  complete(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error(`Todo ${id} not found`);
    }
    todo.done = true;
    return todo;
  }

  remove(id) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Todo ${id} not found`);
    }
    return this.todos.splice(index, 1)[0];
  }

  /** Returns todos, optionally filtered by status: 'all' | 'done' | 'pending' */
  list(filter = 'all') {
    if (filter === 'done') return this.todos.filter((t) => t.done);
    if (filter === 'pending') return this.todos.filter((t) => !t.done);
    if (filter === 'all') return [...this.todos];
    throw new Error(`Unknown filter: ${filter}`);
  }

  /** Percentage of todos completed, rounded to a whole number. */
  progress() {
    if (this.todos.length === 0) return 0;
    const done = this.todos.filter((t) => t.done).length;
    return Math.round((done / this.todos.length) * 100);
  }
}

module.exports = { TodoList };
