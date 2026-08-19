package com.devorbit.taskoff.data.repository

import com.devorbit.taskoff.data.api.ApiService
import com.devorbit.taskoff.data.models.Task

class TaskRepository(
    private val apiService: ApiService
) {
    suspend fun getTasks(): List<Task> = apiService.getTasks()
}
