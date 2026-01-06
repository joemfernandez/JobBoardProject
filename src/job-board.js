var JobBoardApp = (function ($) {
  "use strict";

  // --- Module: Data Service ---
  var DataService = {
    fetchJobs: function (url) {
      return $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        cache: false,
      });
    },
  };

  // --- Module: UI Controller ---
  var UIController = {
    modal: null,
    modalTitle: null,
    modalBody: null,

    setupModal: function (config) {
      this.modal = $(config.modalSelector);
      this.modalTitle = $("#job-modal-title");
      this.modalBody = $("#job-modal-body");

      // Use .off() before .on() to ensure we only ever have ONE click event
      $("#job-modal-close")
        .off("click")
        .on("click", function () {
          UIController.closeModal();
        });

      $(window)
        .off("click.jobmodal")
        .on("click.jobmodal", function (event) {
          if (event.target.id === config.modalSelector.replace("#", "")) {
            UIController.closeModal();
          }
        });

      $(document).on("keydown", function (event) {
        if (event.key === "Escape") {
          UIController.closeModal();
        }
      });
    },

    openModal: function (data) {
      // Map JSON keys to DOM
      this.modalTitle.text(data.Position);
      this.modalBody.html(data.Details);

      // Show Modal
      this.modal.removeClass("job-modal-hidden");
      // Prevent background scrolling on the body while modal is open
      $("body").css("overflow", "hidden");
    },

    // Inside job-board.js -> UIController
    closeModal: function () {
      console.log("closeModal function executed");
      // Instead of only using this.modal, let's ensure we target the current DOM state
      $(this.modal).addClass("job-modal-hidden");

      // Safety check: if this.modal is lost, find it by ID
      if (!$(this.modal).hasClass("job-modal-hidden")) {
        $("#job-modal-overlay").addClass("job-modal-hidden");
      }

      $("#job-modal-body").empty();
      $("body").css("overflow", "");
    },

    formatDate: function (dateString) {
      if (!dateString) return "";
      // Simple date formatting.
      // For SharePoint 2016/IE11 compatibility, we handle ISO strings carefully.
      var date = new Date(dateString);
      // If date is invalid, return original string
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString();
    },

    initTable: function (config, data) {
      if (!data || data.length === 0) {
        $(config.loadingSelector).text("No current job openings found.");
        return;
      }

      var table = $(config.tableSelector).DataTable({
        lengthMenu: [
          [5, 10, 25, 50, -1],
          [5, 10, 25, 50, "All"],
        ],
        data: data,
        columns: [
          { data: "Notice_Num" }, // Exact match to JSON key
          {
            data: "Announcement_Date",
            render: function (data) {
              return UIController.formatDate(data);
            },
          },
          { data: "Command_Location" },
          { data: "Grade" },
          {
            data: "Position",
            render: function (data, type, row) {
              // Render a button. We use the Position title as the button text.
              return (
                '<button class="job-view-btn" type="button">' +
                data +
                "</button>"
              );
            },
          },
        ],
        order: [[1, "desc"]], // Sort by Announcement_Date descending

        // Optional: Enable responsive features if you have the plugin,
        // otherwise this does nothing but is good practice.
        responsive: true,
      });

      // Handle Button Click using Event Delegation
      $(config.tableSelector + " tbody").on(
        "click",
        ".job-view-btn",
        function () {
          var tr = $(this).closest("tr");
          var rowData = table.row(tr).data();
          UIController.openModal(rowData);
        }
      );

      $(config.loadingSelector).hide();
      $(config.tableSelector).show();
    },
  };

  // --- Main Initializer ---
  var init = function (settings) {
    if (!settings.dataUrl) return;

    UIController.setupModal(settings);

    DataService.fetchJobs(settings.dataUrl)
      .done(function (response) {
        // Ensure response is an array (handle case where SharePoint wraps in {d: results})
        var results = response.d ? response.d : response;
        UIController.initTable(settings, results);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        $(settings.loadingSelector)
          .text("Error loading data. Please try again later.")
          .css("color", "red");
        console.error("JobBoardApp Error:", errorThrown);
      });
  };

  return {
    init: init,
    _test: {
      UIController: UIController,
      DataService: DataService,
    },
  };
})(jQuery);
