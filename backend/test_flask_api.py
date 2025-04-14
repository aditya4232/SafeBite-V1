import requests
import json
import sys

# Base URL for the API (local or production)
BASE_URL = "http://localhost:5000"  # Change to your Render URL when deployed

def test_root_endpoint():
    """Test the root endpoint"""
    print("Testing root endpoint...")
    response = requests.get(f"{BASE_URL}/")
    if response.status_code == 200:
        print("✅ Root endpoint working")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    else:
        print(f"❌ Root endpoint failed with status code {response.status_code}")
        print(f"Response: {response.text}")
    print()

def test_status_endpoint():
    """Test the status endpoint"""
    print("Testing status endpoint...")
    response = requests.get(f"{BASE_URL}/status")
    if response.status_code == 200:
        print("✅ Status endpoint working")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    else:
        print(f"❌ Status endpoint failed with status code {response.status_code}")
        print(f"Response: {response.text}")
    print()

def test_search_endpoint(query="apple"):
    """Test the search endpoint with a query"""
    print(f"Testing search endpoint with query '{query}'...")
    response = requests.get(f"{BASE_URL}/search?q={query}")
    if response.status_code == 200:
        results = response.json()
        print(f"✅ Search endpoint working - Found {len(results)} results")
        if len(results) > 0:
            # Print the first result
            print(f"First result: {json.dumps(results[0], indent=2)}")
    elif response.status_code == 404:
        print(f"⚠️ No results found for '{query}'")
        print(f"Response: {response.text}")
    else:
        print(f"❌ Search endpoint failed with status code {response.status_code}")
        print(f"Response: {response.text}")
    print()

def test_product_endpoint(product_id):
    """Test the product endpoint with a product ID"""
    print(f"Testing product endpoint with ID '{product_id}'...")
    response = requests.get(f"{BASE_URL}/product/{product_id}")
    if response.status_code == 200:
        print("✅ Product endpoint working")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    elif response.status_code == 404:
        print(f"⚠️ Product with ID '{product_id}' not found")
        print(f"Response: {response.text}")
    else:
        print(f"❌ Product endpoint failed with status code {response.status_code}")
        print(f"Response: {response.text}")
    print()

def run_all_tests():
    """Run all tests"""
    print("🔍 Running tests for SafeBite Flask API")
    print(f"Base URL: {BASE_URL}")
    print("=" * 50)
    
    test_root_endpoint()
    test_status_endpoint()
    
    # Test search with different queries
    test_search_endpoint("apple")
    test_search_endpoint("banana")
    test_search_endpoint("chocolate")
    
    # Get a product ID from search results to test product endpoint
    try:
        search_response = requests.get(f"{BASE_URL}/search?q=apple")
        if search_response.status_code == 200 and len(search_response.json()) > 0:
            product_id = search_response.json()[0]["_id"]
            test_product_endpoint(product_id)
    except Exception as e:
        print(f"❌ Error getting product ID for testing: {str(e)}")
    
    print("=" * 50)
    print("🏁 All tests completed")

if __name__ == "__main__":
    # Check if a custom base URL is provided as a command-line argument
    if len(sys.argv) > 1:
        BASE_URL = sys.argv[1]
    
    run_all_tests()
