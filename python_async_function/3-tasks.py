#!/usr/bin/env python3
"""This file creates a task"""

import asyncio

wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int) -> asyncio.Task:
    """Create and return a task that waits for a random time."""
    return asyncio.create_task(wait_random(max_delay))
