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


beforeEach(async () => {
    const container = await AstroContainer.create();
    const componentHTML = await container.renderToString(Navigation, {
        props: {
            ariaLabel,
            items,
        }
    });
    document.body.innerHTML = componentHTML;
});

test("There is exactly one nav element", () => {
    expect(document.querySelectorAll("nav")).toHaveLength(1);
});

test("aria-label is rendered correctly", () => {
    const navigation = document.querySelector("nav");
    expect(navigation?.getAttribute("aria-label")).toBe(ariaLabel);
});

test("nav contains exactly one ul element", () => {
    const navigation = document.querySelector("nav");
    expect(navigation?.querySelectorAll("ul")).toHaveLength(1);
});

test("ul element contains the good number of li", () => {
    const navigation = document.querySelector("nav");
    const list = navigation?.querySelector("ul");
    const listItems = list?.querySelectorAll("li");
    expect(listItems).toHaveLength(items.length);
});

test("Each list item contains exactly one link", () => {
    const navigation = document.querySelector("nav");
    const list = navigation?.querySelector("ul");
    const listItems = list?.querySelectorAll("li");
    listItems?.forEach((item) => expect(item?.querySelectorAll("a")).toHaveLength(1));
});

test("Link text and href are correct", () => {
    const navigation = document.querySelector("nav");
    const list = navigation?.querySelector("ul");
    const listItems = list?.querySelectorAll("li");
    listItems?.forEach((item, index) => {
        const link = item?.querySelector("a")
        expect(link?.textContent.trim()).toBe(items[index].label);
        expect(link?.getAttribute("href")).toBe(items[index].href);
    });
});

test("aria-current is applied correctly", () => {
    const navigation = document.querySelector("nav");
    const list = navigation?.querySelector("ul");
    const currentLinks = list?.querySelectorAll('a[aria-current="page"]');
    expect(currentLinks).toHaveLength(1);
    expect(currentLinks?.[0].textContent.trim()).toBe(items[0].label);
    expect(currentLinks?.[0].getAttribute("href")).toBe(items[0].href);
});