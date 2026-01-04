QUnit.module('JobBoardApp Logic Tests', function () {

    QUnit.test('formatDate should return formatted string', function (assert) {
        var result = JobBoardApp._test.UIController.formatDate("2025-12-17T00:00:00");
        assert.ok(result.indexOf("17") > -1, "Contains correct day");
        assert.ok(result.indexOf("2025") > -1, "Contains correct year");
    });

    QUnit.test('UIController.closeModal logic', function (assert) {
        var $modal = $('#test-modal');
        // Manually link the controller to our test element
        JobBoardApp._test.UIController.modal = $modal;

        $modal.removeClass('job-modal-hidden');
        JobBoardApp._test.UIController.closeModal();

        assert.ok($modal.hasClass('job-modal-hidden'), "Direct function call successfully hides modal");
    });
});

QUnit.module('Integration Tests (Async)', function (hooks) {

    QUnit.test('Table populates and Modal toggles', function (assert) {
        var done = assert.async();

        // 1. Init App
        JobBoardApp.init({
            dataUrl: "../data/job-data.json",
            tableSelector: "#test-table",
            loadingSelector: "#test-loading",
            modalSelector: "#test-modal"
        });

        // 2. Wait for DataTables render
        var checkExist = setInterval(function () {
            var $rows = $('#test-table tbody tr');
            if ($rows.length > 0 && !$rows.find('td').hasClass('dataTables_empty')) {
                clearInterval(checkExist);

                assert.ok(true, "Table rendered data rows");

                // 3. Test Modal Open
                var $btn = $rows.first().find('.job-view-btn');
                $btn.trigger('click');

                assert.notOk($('#test-modal').hasClass('job-modal-hidden'), "Modal visible after button click");

                // 4. Test Modal Close
                setTimeout(function () {
                    $('#job-modal-close').trigger('click');
                    assert.ok($('#test-modal').hasClass('job-modal-hidden'), "Modal hidden after close click");
                    done();
                }, 100);
            }
        }, 200);

        setTimeout(function () { clearInterval(checkExist); }, 5000);
    });
});