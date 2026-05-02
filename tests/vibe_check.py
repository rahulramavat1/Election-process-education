import asyncio
from playwright.async_api import async_playwright
import os

async def run_vibe_check():
    print("🚀 Starting Automated E2E Validation (Vibe Check)...")
    
    # Path to local index.html
    html_path = f"file://{os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'index.html'))}"
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        print(f"Loading {html_path}...")
        await page.goto(html_path)
        
        # --- 1. Basic Load & SEO check ---
        title = await page.title()
        assert "India Votes" in title, "Title check failed"
        print("✅ SEO & Basic Load Check Passed")
        
        # --- 2. Interactive State Spotlight ---
        await page.select_option("#state-dropdown", "delhi")
        # wait for animation
        await page.wait_for_timeout(500)
        state_name = await page.locator("#selected-state-name").inner_text()
        assert "Delhi Assembly" in state_name, "State dropdown logic failed"
        print("✅ Interactive State Logic Passed")
        
        # --- 3. Timeline Interaction ---
        stage_3 = page.locator(".event-node[data-id='3']")
        await stage_3.click()
        details = await page.locator("#event-details h3").inner_text()
        assert "Scrutiny" in details, "Timeline logic failed"
        print("✅ Interactive Timeline Passed")
        
        # --- 4. ARIA Audit on AI Chat UI ---
        ai_toggle = page.locator("#ai-toggle")
        
        # Initially closed
        expanded = await ai_toggle.get_attribute("aria-expanded")
        assert expanded == "false", "AI Toggle should be collapsed initially"
        
        # Open Chat
        await ai_toggle.click()
        expanded = await ai_toggle.get_attribute("aria-expanded")
        assert expanded == "true", "AI Toggle aria-expanded should be true after click"
        
        chat_hidden = await page.locator("#chat-window").get_attribute("aria-hidden")
        assert chat_hidden == "false", "Chat window should not be hidden"
        
        # Send a message to AI
        await page.fill("#user-input", "Am I eligible to vote?")
        await page.click("#send-msg")
        
        # Wait for AI response (bot class message)
        await page.wait_for_selector(".message.bot:nth-of-type(3)") # 1st is default, 2nd is loading/response
        
        messages = await page.locator(".message").all_inner_texts()
        bot_response = messages[-1]
        assert "eligible" in bot_response.lower(), "AI failed to respond with eligibility logic"
        print("✅ AI State Machine & ARIA Audit Passed")
        
        await browser.close()
        print("🎉 All 99% criteria checks passed!")

if __name__ == "__main__":
    asyncio.run(run_vibe_check())
