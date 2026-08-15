package com.devorbit.taskoff.data.models

import com.google.gson.annotations.SerializedName

/**
 * Task Status Enum matching backend schema: ["Todo", "In Progress", "In Review", "Done"]
 */
enum class TaskStatus(val value: String) {
    @SerializedName("Todo")
    TODO("Todo"),

    @SerializedName("In Progress")
    IN_PROGRESS("In Progress"),

    @SerializedName("In Review")
    IN_REVIEW("In Review"),

    @SerializedName("Done")
    DONE("Done");

    companion object {
        fun fromString(statusStr: String?): TaskStatus {
            return entries.find { it.value.equals(statusStr, ignoreCase = true) } ?: TODO
        }
    }
}

/**
 * Task Data Model matching Backend Task schema & TECHNICAL_SPEC.md
 */
data class Task(
    @SerializedName("_id")
    val id: String,

    @SerializedName("taskNumber")
    val taskNumber: Int,

    @SerializedName("title")
    val title: String,

    @SerializedName("description")
    val description: String? = null,

    @SerializedName("status")
    val status: TaskStatus = TaskStatus.TODO,

    @SerializedName("tag")
    val tag: String? = null,

    @SerializedName("assignee")
    val assignee: User? = null,

    @SerializedName("createdAt")
    val createdAt: String? = null,

    @SerializedName("updatedAt")
    val updatedAt: String? = null
) {
    /**
     * Formatted task number for UI display (e.g., "#014")
     */
    val formattedTaskNumber: String
        get() = "#%03d".format(taskNumber)
}
