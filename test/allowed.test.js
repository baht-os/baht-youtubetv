// BAHT: navigation lock of the YouTube TV window (node --test, after `npx tsc`).
const { test } = require('node:test');
const assert = require('node:assert');
const { allowedUrl } = require('../renderers/main/allowed');

test('YouTube and Google sign-in are allowed', () => {
    for (const u of ['https://www.youtube.com/tv?', 'https://youtube.com/tv#/watch', 'https://accounts.google.com/o/oauth2',
                     'https://i.ytimg.gstatic.com/x.png'])
        assert.ok(allowedUrl(u), u);
});

test('everything else is refused', () => {
    for (const u of ['http://www.youtube.com/tv', 'https://youtube.com.evil.example/', 'https://evilyoutube.com/',
                     'file:///etc/passwd', 'javascript:alert(1)', 'https://example.com/?https://youtube.com',
                     'https://youtube.com@evil.example/', 'not a url', ''])
        assert.ok(!allowedUrl(u), u);
});
