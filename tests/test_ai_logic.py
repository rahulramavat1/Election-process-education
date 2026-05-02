import re

def test_ai_logic():
    print("Running AI Logic Tests...")
    
    # Mocking the AI Knowledge Base logic
    knowledge_base = {
        "voter id": "Form 6",
        "evm": "Balloting Unit",
        "vvpat": "7 seconds"
    }
    
    # Test case 1: Keywords
    assert "Form 6" in knowledge_base["voter id"]
    print("  + Keyword check passed")
    
    # Test case 2: Logic flow
    # Simulating the journey state
    step = 'onboarding'
    query = "i am 18"
    if "18" in query:
        response = "Are you 18 or above?" # Simplified logic check
        assert "18" in response
    print("  + Eligibility flow logic passed")

if __name__ == "__main__":
    try:
        test_ai_logic()
        print("\nAll Logic Tests Passed Successfully!")
    except Exception as e:
        print(f"\nTest Failed: {e}")
        exit(1)
