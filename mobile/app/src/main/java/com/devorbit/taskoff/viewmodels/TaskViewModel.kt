package com.devorbit.taskoff.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.devorbit.taskoff.data.repository.TaskRepository
import com.devorbit.taskoff.ui.tasks.TaskListUiState
import java.io.IOException
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import kotlinx.coroutines.Dispatchers
import retrofit2.HttpException

class TaskViewModel(
    private val repository: TaskRepository
) : ViewModel() {

    private val _uiState = MutableLiveData<TaskListUiState>()
    val uiState: LiveData<TaskListUiState> = _uiState

    fun loadTasks() {
        viewModelScope.launch {
            _uiState.value = TaskListUiState.Loading

            try {
                val tasks = withContext(Dispatchers.IO) { repository.getTasks() }
                _uiState.value = if (tasks.isEmpty()) {
                    TaskListUiState.Empty
                } else {
                    TaskListUiState.Content(tasks)
                }
            } catch (error: Exception) {
                _uiState.value = TaskListUiState.Error(error.toUserMessage())
            }
        }
    }
}

private fun Throwable.toUserMessage(): String = when (this) {
    is HttpException -> when (code()) {
        401 -> "Sign in to load your tasks."
        403 -> "You do not have permission to view these tasks."
        else -> "We could not load tasks right now. Please try again."
    }

    is IOException -> "We could not reach the task server. Check the connection and try again."
    else -> "We could not load tasks right now. Please try again."
}
