package com.devorbit.taskoff.ui.tasks

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.devorbit.taskoff.data.models.Task
import com.devorbit.taskoff.databinding.ItemTaskBinding

class TaskListAdapter : ListAdapter<Task, TaskListAdapter.TaskViewHolder>(DIFF_CALLBACK) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TaskViewHolder {
        val binding = ItemTaskBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return TaskViewHolder(binding)
    }

    override fun onBindViewHolder(holder: TaskViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    class TaskViewHolder(
        private val binding: ItemTaskBinding
    ) : RecyclerView.ViewHolder(binding.root) {

        fun bind(task: Task) {
            binding.numberText.text = task.formattedTaskNumber
            binding.taskTitle.text = task.title
            binding.taskDescription.text = task.description ?: "No description provided."
            binding.taskTag.text = task.tag ?: "General"
            binding.taskStatus.text = TaskListUiMapper.statusLabel(task)
            binding.taskAssignee.text = "Assigned to: ${TaskListUiMapper.assigneeLabel(task)}"
        }
    }

    companion object {
        private val DIFF_CALLBACK = object : DiffUtil.ItemCallback<Task>() {
            override fun areItemsTheSame(oldItem: Task, newItem: Task): Boolean = oldItem.id == newItem.id

            override fun areContentsTheSame(oldItem: Task, newItem: Task): Boolean = oldItem == newItem
        }
    }
}
