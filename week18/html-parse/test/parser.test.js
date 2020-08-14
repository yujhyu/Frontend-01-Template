import { parseHTML } from '../src/parser.js';
import assert from 'assert'

it('parse a single element', () => {
	let doc = parseHTML("<div></div>");
	let div = doc.children[0];
	assert.equal(div.tagName, "div");
	assert.equal(div.children.length, 0);
	assert.equal(div.type, "element");
	assert.equal(div.attributes.length, 0);
});

it('parse a single element with text content', () => {
	let doc = parseHTML("<div>hello</div>");
	let text = doc.children[0].children[0];
	assert.equal(text.content, "hello");
	assert.equal(text.type, "text");
	console.log(text)
});

it('tag mismatch', () => {
	try {
		let doc = parseHTML("<div></vid>");
	} catch (error) {
		assert.equal(error.message, "Tag start end doesn't match!");
	}
});

it('text with <', () => {
	let doc = parseHTML("<div>a < b</div>");
	let text = doc.children[0].children[0];
	assert.equal(text.content, "a < b");
	assert.equal(text.type, "text");
});

it('with property', () => {
	let doc = parseHTML("<div id=a class='cls' data=\"abc\" ></div>");
	let div = doc.children[0];

	let count = 0;

	for (const attr of div.attributes) {
		if (attr.name === "id") {
			count++;
			assert.equal(attr.value, "a");
		}
		if (attr.name === "class") {
			count++;
			assert.equal(attr.value, "cls");
		}
		if (attr.name === "data") {
			count++;
			assert.equal(attr.value, "abc");
		}
	}

	assert.ok(count === 3);
});

it('with property2', () => {
	let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>");
	let div = doc.children[0];

	let count = 0;

	for (const attr of div.attributes) {
		if (attr.name === "id") {
			count++;
			assert.equal(attr.value, "a");
		}
		if (attr.name === "class") {
			count++;
			assert.equal(attr.value, "cls");
		}
		if (attr.name === "data") {
			count++;
			assert.equal(attr.value, "abc");
		}
	}

	assert.ok(count === 3);
});

it('with property3', () => {
	let doc = parseHTML("<div id=a class='cls' data=\"abc\"/>");
	let div = doc.children[0];

	let count = 0;

	for (const attr of div.attributes) {
		if (attr.name === "id") {
			count++;
			assert.equal(attr.value, "a");
		}
		if (attr.name === "class") {
			count++;
			assert.equal(attr.value, "cls");
		}
		if (attr.name === "data") {
			count++;
			assert.equal(attr.value, "abc");
		}
	}

	assert.ok(count === 3);
});

it('script', () => {
	let content = `
		<div>abcd</div>
		<span>abcd</span>
		/script>
		</script
		<
		</
		</s
		</scr
		</scr
		</scri
		</scrip
		</script `;
	let doc = parseHTML(`<script>${content}</script>`);
	let text = doc.children[0].children[0];
	assert.equal(text.content, content);
	assert.equal(text.type, "text");
});

it('attribute with no vlaue', () => {
	let doc = parseHTML("<div class />");
});

it('attribute with no vlaue', () => {
	let doc = parseHTML("<div class id/>");
});