import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test, beforeEach } from 'vitest';
import Navigation from "../src/components/Navigation.astro";

const ariaLabel = "Main Navigation";
let items = [
    { label: "Home", href: "/", current: true },
    { label: "Shop", href: "/shop/" },
    { label: "Blog", href: "/blog/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
] as const;

let navigation: HTMLElement | null;
let list: HTMLElement | null;

beforeEach(async () => {
    const container = await AstroContainer.create();
    const componentHTML = await container.renderToString(Navigation, {
        props: {
            ariaLabel,
            items,
        }
    });

    document.body.innerHTML = componentHTML;
    navigation = document.querySelector("nav");
    list = navigation?.querySelector("ul") || null;
});

test("There is exactly one nav element", () => {
    expect(document.querySelectorAll("nav")).toHaveLength(1);
});

test("aria-label is rendered correctly", () => {
    expect(navigation?.getAttribute("aria-label")).toBe(ariaLabel);
});

test("nav contains exactly one ul element", () => {
    expect(navigation?.querySelectorAll("ul")).toHaveLength(1);
});

test("ul element contains the good number of li", () => {
    const listItems = list?.querySelectorAll("li");
    expect(listItems).toHaveLength(items.length);
});

test("Each list item contains exactly one link", () => {
    list?.querySelectorAll("li")
        .forEach((item) => expect(item?.querySelectorAll("a")).toHaveLength(1));
});

test("Link text and href are correct", () => {
    list?.querySelectorAll("li").forEach((item, index) => {
        const link = item?.querySelector("a")
        expect(link?.textContent.trim()).toBe(items[index].label);
        expect(link?.getAttribute("href")).toBe(items[index].href);
    });
});

test("aria-current is applied correctly", () => {
    const currentLinks = list?.querySelectorAll('a[aria-current="page"]');
    expect(currentLinks).toHaveLength(1);
    expect(currentLinks?.[0].textContent.trim()).toBe(items[0].label);
    expect(currentLinks?.[0].getAttribute("href")).toBe(items[0].href);
});

test("There is exactly one button inside `<nav>`", () => {
    expect(navigation?.querySelectorAll("button")).toHaveLength(1);
});

test("The button type is `button`", () => {
    expect(navigation?.querySelector("button")?.getAttribute("type")).toBe("button");
});

test("The button is associated to the item list by aria-controls", () => {
    const listID = list?.id;
    expect(listID).toBeTruthy();
    expect(navigation?.querySelector("button")?.getAttribute("aria-controls"))
        .toBe(listID);
});

test("The toggle button is expanded by default (aria-expanded=true)", () => {
    expect(navigation?.querySelector("button")?.getAttribute("aria-expanded"))
        .toBe("true");
});

test("The item list is not hidden by default", () => {
    expect(list?.hasAttribute("hidden")).toBeFalsy();
});
