#!/usr/bin/env python3
"""
Module that defines an asynchronous function to run multiple
task-based coroutines concurrently and return their delays
in ascending order.
"""

import asyncio
from typing import List

task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """
    Spawns n asyncio tasks using task_wait_random, waits for
    all of them to complete, and returns a list of delays
    in ascending order.

    Args:
        n (int): number of tasks to spawn
        max_delay (int): maximum delay value

    Returns:
        List[float]: list of delays sorted in ascending order
    """
    tasks = [task_wait_random(max_delay) for _ in range(n)]
    delays = []

    for completed in asyncio.as_completed(tasks):
        result = await completed
        delays.append(result)

    return delays
