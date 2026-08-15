package com.devorbit.taskoff.ui.tasks

import com.devorbit.taskoff.data.models.Task
import com.devorbit.taskoff.data.models.TaskStatus
import org.junit.Assert.assertEquals
import org.junit.Test

class TaskListUiMapperTest {
    @Test
    fun `status label is human readable`() {
        val task = Task(
            id = "1",
            taskNumber = 14,
            title = "Fix login flow",
            description = "Handle invalid session redirect",
            status = TaskStatus.IN_PROGRESS,
            tag = "Bug"
        )

        assertEquals("In Progress", TaskListUiMapper.statusLabel(task))
    }

    @Test
    fun `assignee label falls back to unassigned`() {
        val task = Task(
            id = "2",
            taskNumber = 7,
            title = "Write release notes",
            description = "Update docs for launch",
            status = TaskStatus.TODO,
            tag = "Docs"
        )

        assertEquals("Unassigned", TaskListUiMapper.assigneeLabel(task))
    }
}
