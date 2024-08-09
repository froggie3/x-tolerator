// ==UserScript==
// @name         X Tolerator
// @author       Stephen Chapman - X: @Chapman | GitHub: dsasmblr
// @version      0.1
// @downloadURL  https://raw.githubusercontent.com/froggie3/x-tolerator/main/x-tolerator.js
// @description  Make X a bearable experience
// @match        *://*.x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(() => {
    const HOME_PAGE = 'x.com/home';

    const setNahDog = () => {
        const isHomePage = location.href.includes(HOME_PAGE);
        const forYouTab = document.querySelector(`.css-175oi2r.r-14tvyh0.r-cpa5s6.r-16y2uox`);
        const forYouTabText = document.querySelector(`.css-175oi2r.r-14tvyh0.r-cpa5s6.r-16y2uox span`);
        const isForYouText = ['For you', 'おすすめ'].some(e => forYouTabText?.innerText === e);
        const forYouTabIsActive = forYouTab?.ariaSelected === 'false';
        const followingTab = [...document.querySelectorAll('[role=tab]')][0];

        if (!isHomePage || !forYouTab || !forYouTabText) {
            return;
        }

        if (isForYouText) {
            forYouTab.remove();
        }

        if (forYouTabIsActive) {
            followingTab.click();
            followingTab.focus();
        }
    }

    const noAds = () => {
        const targets = [
            '[href^="/i/grok"]',
            '[href^="/i/premium_sign_up"]',
            '[href*="/communities"]',
            '[href^="/settings/monetization"]',
            '[href^="/i/verified-orgs-signup"]',
            '[href^="/jobs"]',
            '[href^="https://ads.twitter.com/?ref=gl-tw-tw-twitter-ads-rweb"]',
        ];

        for (let s of targets) {
            for (let e of Array.from(document.querySelectorAll(s))) {
                e.style.display = 'none';
            }
        }

        // hide ongoing spaces, trends, etc.
        const justHidden = [
            '.css-175oi2r.r-1habvwh.r-eqz5dr.r-uaa2di.r-1mmae3n.r-3pj75a.r-bnwqim',
            '.css-175oi2r.r-kemksi.r-1kqtdi0.r-1867qdf.r-1phboty.r-rs99b7.r-1ifxtd0.r-1udh08x',
        ];
        for (let s of justHidden) {
            for (let e of Array.from(document.querySelectorAll(s))) {
                e.style.visibility = 'hidden';
            }
        }
    }

    const target = document.body;
    const config = {
        childList: true,
        subtree: true
    }

    const callback = (mutList, obs) => {
        if (mutList) {
            noAds();
            setNahDog();
        }
    }

    const obs = new MutationObserver(callback);

    obs.observe(target, config);
})();
