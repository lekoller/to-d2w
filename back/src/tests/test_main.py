def test_listing_empty(client):
    response = client.get("/api/v1/item")
    data = response.data.decode("utf-8").replace("\n", "")

    assert response.status_code == 200
    assert "[]" == data

def test_creating(client):
    response = client.post("/api/v1/item", json={"title": "test", "description": "test"})
    data = response.data.decode("utf-8").replace("\n", "")

    assert response.status_code == 201
    assert '"id": 1' in data
    assert '"title": "test"' in data
    assert '"description": "test"' in data

def test_updating(client):
    response = client.patch("/api/v1/item", json={"id": 1, "title": "test2", "description": "test2"})
    data = response.data.decode("utf-8").replace("\n", "")

    assert response.status_code == 200
    assert '"id": 1' in data
    assert '"title": "test2"' in data
    assert '"description": "test2"' in data
    assert '"completed": false' in data

def test_finding(client):
    response = client.get("/api/v1/item?id=1")
    data = response.data.decode("utf-8").replace("\n", "")

    assert response.status_code == 200
    assert '"id": 1' in data
    assert '"title": "test2"' in data
    assert '"description": "test2"' in data
    assert '"completed": false' in data

def test_marking_completed(client):
    response = client.patch("/api/v1/item/done?id=1")
    data = response.data.decode("utf-8").replace("\n", "")

    assert response.status_code == 200
    assert '"id": 1' in data
    assert '"title": "test2"' in data
    assert '"description": "test2"' in data
    assert '"completed": true' in data

def test_finding_after_completed(client):
    response = client.get("/api/v1/item?id=1")
    data = response.data.decode("utf-8").replace("\n", "")

    assert response.status_code == 200
    assert '"id": 1' in data
    assert '"title": "test2"' in data
    assert '"description": "test2"' in data
    assert '"completed": true' in data

def test_destroying(client):
    response = client.delete("/api/v1/item?id=1")

    assert response.status_code == 204