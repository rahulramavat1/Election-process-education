import asyncio
from playwright.async_api import async_playwright
import os

async def run_vibe_check():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Assuming the app is running locally for testing or checking the live URL
        # For this test, we will check the live URL
        url = "http://localhost:8080"
        page = await browser.new_page()
        
        print(f"Checking {url}...")
        await page.goto(url)

        # 1. Check Title
        title = await page.title()
        print(f"Title: {title}")
        assert "India Votes" in title

        # 2. Check Security Meta Tags
        csp = await page.get_attribute("meta[http-equiv='Content-Security-Policy']", "content")
        print(f"CSP Found: {csp is not None}")
        assert csp is not None

        # 3. Check Timeline Interaction
        print("Testing Timeline...")
        await page.click("div[data-id='1']")
        details_h3 = await page.inner_text("#event-details h3")
        print(f"Timeline Step 1: {details_h3}")
        assert "Notification" in details_h3

        # 4. Check Accordion
        print("Testing Accordion...")
        await page.click("button.accordion-header:has-text('What is NOTA?')")
        expanded = await page.get_attribute("button.accordion-header:has-text('What is NOTA?')", "aria-expanded")
        print(f"Accordion Expanded: {expanded}")
        assert expanded == "true"

        # 5. Check Live Ticker
        print("Checking Live Ticker...")
        ticker_text = await page.inner_text(".live-ticker")
        print(f"Ticker: {ticker_text.encode('ascii', 'ignore').decode('ascii')}")
        assert "LIVE:" in ticker_text and "Official Election Results" in ticker_text

        # 6. Check State Spotlight
        print("Testing State Spotlight Dropdown...")
        await page.select_option("#state-dropdown", "tn")
        await page.wait_for_timeout(500) # Wait for animation
        state_name = await page.inner_text("#selected-state-name")
        print(f"Selected State: {state_name}")
        assert "Tamil Nadu" in state_name
        
        magic_num = await page.inner_text("#magic-number")
        print(f"Tamil Nadu Magic Number: {magic_num}")
        assert magic_num == "118"

        ruling_party = await page.inner_text("#ruling-party")
        print(f"Ruling Party: {ruling_party}")
        assert "DMK-led" in ruling_party

        print("\nVIBE CHECK PASSED: Site is secure, accessible, and interactive.")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_vibe_check())
