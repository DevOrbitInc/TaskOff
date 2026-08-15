package com.devorbit.taskoff.ui.tasks

import com.devorbit.taskoff.data.models.Task

object TaskListUiMapper {
    fun statusLabel(task: Task): String = task.status.value

    fun assigneeLabel(task: Task): String = task.assignee?.fullName ?: "Unassigned"
}
