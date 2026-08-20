package com.devorbit.taskoff.ui.tasks

import com.devorbit.taskoff.data.models.Task

sealed interface TaskListUiState {
    data object Loading : TaskListUiState
    data class Content(val tasks: List<Task>) : TaskListUiState
    data object Empty : TaskListUiState
    data class Error(val message: String) : TaskListUiState
}
