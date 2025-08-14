import asyncio
from playwright.sync_api import sync_playwright, expect

def verify_tutorial():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        # Navigate to the local file
        page.goto("file:///app/tutorial/index.html")

        # Scroll the tutorial into view
        tutorial_container = page.locator("#interactive-tutorial-container")
        tutorial_container.scroll_into_view_if_needed()

        # Wait for the page to load and the first step to be ready
        expect(page.locator("#tutorial-message")).to_contain_text("Salva i dati una volta")

        # Click "Next" to go to step 2
        page.locator("#next-step").click()
        expect(page.locator("#current-step-number")).to_have_text("2")

        # Click "Next" to go to step 3
        page.locator("#next-step").click()
        expect(page.locator("#current-step-number")).to_have_text("3")

        # Click "Next" to go to step 4
        page.locator("#next-step").click()
        expect(page.locator("#current-step-number")).to_have_text("4")
        expect(page.locator("#tutorial-message")).to_contain_text("Un ultimo controllo e via!")

        # Wait for the final effect to be visible
        expect(page.locator(".effect-step-4-checkmark")).to_be_visible(timeout=5000)

        # Add a small delay to ensure all animations have rendered
        page.wait_for_timeout(1000)

        # Take a screenshot of the final state
        page.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()

verify_tutorial()
