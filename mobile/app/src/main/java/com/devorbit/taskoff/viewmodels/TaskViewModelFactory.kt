package com.devorbit.taskoff.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.devorbit.taskoff.data.api.TaskApiFactory
import com.devorbit.taskoff.data.repository.TaskRepository

class TaskViewModelFactory(
    private val applicationContext: Context
) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (TaskViewModel::class.java.isAssignableFrom(modelClass)) {
            return TaskViewModel(
                TaskRepository(TaskApiFactory.create(applicationContext))
            ) as T
        }

        throw IllegalArgumentException("Unknown ViewModel class: ${modelClass.name}")
    }
}
