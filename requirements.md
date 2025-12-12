# Navigation menu requirements

## Structure

* Use an `<ul>` element for menu items.
* Enclose the list in a `<nav>` element.
* Label the menu (the `<nav>`) using an `aria-label="Main Menu"`.
* Indicate the current menu item using `aria-label="page"` on the correspondig `<a>`.

## Styling

### General considerations

* If icons are used (without accompagning visible text), an alternative text is required (`alt` or `aria-label`).
* Contrast requirements apply to menu texts and icons.
* **Location**: The menu must be located where the target audience expect it to be.
    The main navigation menu is commonly located either vertically on the left (for left-to-right languages), or horizontally across the top.
* **Identification**: Ensure that menus and their items are identifiable as such.
    Consider making the label of menus visible to everyone (for menus like table of content).
* **Readability**: Ensure appropriate sizing of menus and menu items to fit all text. 
    The menu size should also adapt to varying text sizes, to accommodate languages with longer words and people who need larger text.

    Where possible avoid all uppercase text, line breaks...
* **Size**: Provide sufficient white space, like padding, to support people with reduced dexterity and small touch screens on mobile devices. 
    At the same time, make sure that menus do not overlap themselves and other content of the page when users increase the text size or zoom the page.

    The toggle, and menu items (especially on mobile) should be large enough to tap (on touch).

### Menu items

* Convey menu items and their states by using color and other styling options.
    Don’t rely on color alone as some users will be unable to perceive such changes.
* **Default state**: Use distinct styling to visually indicate menu items as regions of the page that can be activated. 
    However, avoid exaggerated text decoration, such as words in upper case or small caps, as these make text harder to read.
* **Hover and Focus states**: Change hovered or focused menu items, which gives users visual guidance when navigating the menu.
    ```css
    nav a:hover,
    nav a:focus {
	    color: #036;
	    background-color: #fff;
	    text-decoration: underline;
    }
    ```
* **Active state**: Indicate the menu item that was activated through clicking, tapping, or keyboard selection. 
    Users can identify unintended activation, for instance when they have clicked on the wrong menu item.
    ```css
    nav a:active {
	    color: #fff;
	    background-color: #024;
	    text-decoration: underline;
    }
    ```
* **Current state**: Also visually indicate the current menu item in addition to the structural markup.
    ```css
    nav [aria-current=page] {
	    background-color: #bbb;
	    color: #000;
	    border-bottom: .25em solid #444;
    }
    ```
* **Visited state**: For some types of menus, such as instructional steps, it may be useful to indicate menu items that a user had already visited. 
    However, most menus are not expected to change based on the visited state.

## Hamburger menu

* Use a `<button>` as a toggle (to open and close to menu).
* Put the toggle inside the `<nav>` element.
* Indicate the associated menu using `aria-controles="menu-items-id"`.
* A menu toggle must indicate whether its associated menu is expanded or collapsed.
    `aria-expanded`: Set to `true` if the menu is expanded; `false` if the menu is collapsed.

### Interaction pattern

The following interaction pattern must be scripted for a simple responsive menu disclosure pattern:

* When a user activates the menu toggle, the menu must expand or collapse. The value of aria-expanded must be toggled appropriately to match the menu's visual state.
* If the menu is expanded and the user clicks somewhere else on the page, the menu must collapse. This is done by attached a click handler to the document. You must ensure that your click handler does nothing if the user clicked on the toggle button.
* If the user shift-tabs away from the menu toggle, the menu must collapse if it was expanded. This is done by attached a keydown handler to the menu toggle. This handler must close the menu if the shift key and tab key are pressed.
* If the user tabs away from the last menu item, the menu must collapse. This can be done by attaching a keydown handler to the last menu item; closing the menu if the user presses the tab key (but not the shift key).
* When the menu opens: ensure the first focusable item is reachable, or at least that tab focus order is preserved.
* Closing the menu on Esc (and returning focus to the button) if the menu is open.
* When the menu is closed, hide it and make it unfocusable with `display: none` or `hidden`.

Note: In all of the cases above, be sure to set the value of aria-expanded to match the visual state of the menu: true if expanded, and false if collapsed.

### Handling window resize

An illegal state can be created if the user on a desktop device resizes the window to be narrower while focus is on one of the menu items. The problem is that, if a menu item is in focus in the desktop view, switching to the mobile view will cause the menu to be hidden. It is an illegal state for browser focus to be on an item that is hidden. Creating this state can cause confusion and inconsistent behavior (including crashes) from assistive technology. If focus is on a menu item in the desktop view, the menu must remain open in the mobile view when the window is resized.

To keep the menu open when resizing to the mobile view, attach a focus handler to each of the menu items. This handler should set aria-expanded to true and apply any necessary CSS to expand the menu when a menu item receives focus. If your CSS is correct, no visual change will occur in the dekstop view. The effect will be to keep the menu expanded if a user resizes the window from desktop to mobile view.

## Other suggestions

* Test with a screen reader.
* Test for focus order, announcements, hidden states, etc.
* Avoid burying critical navigation behind the hamburger — especially on desktop, or when navigation is essential.
* Ensure fallback (no JS) — if JS fails or is disabled, navigation should still be accessible or at least usable. Some guidelines suggest designing so the menu is shown by default without JS.

## Optional

* Smooth transitions when opening/closing.
* Prevent body scrolling when menu is open.
* Trap focus only if you use a fullscreen modal nav.

Source 1: <https://www.w3.org/WAI/tutorials/menus/structure/>

Source 2: <https://techservicesillinois.github.io/accessibility/examples/responsive-nav.html>
