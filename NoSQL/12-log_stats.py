#!/usr/bin/env python3
"""
Provides stats about Nginx logs stored in MongoDB
"""
from pymongo import MongoClient


def log_stats():
    """Prints stats about nginx logs"""
    client = MongoClient("mongodb://127.0.0.1:27017")
    collection = client.logs.nginx

    print(f"{collection.count_documents({})} logs")

    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        print(f"\tmethod {method}: {collection.count_documents({'method': method})}")

    print(f"{collection.count_documents({'method': 'GET', 'path': '/status'})} status check")


if __name__ == "__main__":
    log_stats()
