import { add } from '../src/add.js';
import assert from 'assert'

// let assert = require("assert");

it('add(3, 4) should be 7', function () {
	assert.equal(add(3, 4), 7);
});