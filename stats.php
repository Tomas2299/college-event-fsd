<?php
/**
 * HENOSIS 2K25 - ULTIMATE STATS API
 * Real-time Neural Network Statistics
 */

require_once 'config.php';

setJsonHeader();

try {
    $db = DatabaseConnection::getInstance();
    $conn = $db->getConnection();
    
    // Get system statistics
    $statsStmt = $conn->prepare("SELECT stat_name, stat_value FROM system_stats");
    $statsStmt->execute();
    $systemStats = [];
    
    while ($row = $statsStmt->fetch()) {
        $systemStats[$row['stat_name']] = (int)$row['stat_value'];
    }
    
    // Get recent registrations count (last 24 hours)
    $recentStmt = $conn->prepare("
        SELECT COUNT(*) as recent_count 
        FROM registrations 
        WHERE registration_date >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
    ");
    $recentStmt->execute();
    $recentData = $recentStmt->fetch();
    
    // Get event statistics
    $eventStmt = $conn->prepare("
        SELECT 
            e.event_name,
            e.event_type,
            e.prize_amount,
            e.max_participants,
            COUNT(r.id) as registrations,
            ROUND((COUNT(r.id) / e.max_participants) * 100, 1) as fill_percentage
        FROM events e
        LEFT JOIN registrations r ON e.event_type = r.event
        WHERE e.is_active = 1
        GROUP BY e.id
    ");
    $eventStmt->execute();
    $events = $eventStmt->fetchAll();
    
    // Get registration activity for the last 7 days
    $activityStmt = $conn->prepare("
        SELECT 
            DATE(registration_date) as date,
            COUNT(*) as count
        FROM registrations 
        WHERE registration_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        GROUP BY DATE(registration_date)
        ORDER BY date ASC
    ");
    $activityStmt->execute();
    $activityData = $activityStmt->fetchAll();
    
    // Generate random neural activity data for graph
    $neuralActivity = [];
    for ($i = 0; $i < 50; $i++) {
        $neuralActivity[] = [
            'x' => $i,
            'y' => rand(20, 100),
            'timestamp' => date('H:i:s', strtotime("-" . (50 - $i) . " minutes"))
        ];
    }
    
    // Calculate dynamic stats
    $totalEvents = count($events);
    $totalPrizePool = array_sum(array_column($events, 'prize_amount'));
    $averageFillRate = $totalEvents > 0 ? array_sum(array_column($events, 'fill_percentage')) / $totalEvents : 0;
    
    echo json_encode(generateNeuralResponse(
        true,
        'Neural network statistics retrieved successfully',
        [
            'system_stats' => [
                'total_registrations' => $systemStats['total_registrations'] ?? 0,
                'neural_nodes_active' => $systemStats['neural_nodes_active'] ?? 187,
                'sync_rate_percent' => ($systemStats['sync_rate_percent'] ?? 998) / 10, // Convert to percentage
                'quantum_links' => $systemStats['quantum_links'] ?? 156,
                'ai_protocols' => $systemStats['ai_protocols'] ?? 48
            ],
            'real_time_stats' => [
                'recent_registrations_24h' => (int)$recentData['recent_count'],
                'total_events' => $totalEvents,
                'total_prize_pool' => $totalPrizePool,
                'average_fill_rate' => round($averageFillRate, 1),
                'server_uptime' => '99.99%',
                'neural_sync_status' => 'ACTIVE',
                'quantum_stability' => 'STABLE'
            ],
            'events' => $events,
            'activity_chart' => $activityData,
            'neural_activity' => $neuralActivity,
            'last_updated' => date('Y-m-d H:i:s')
        ],
        'STATS_SUCCESS'
    ));
    
} catch (Exception $e) {
    error_log("Stats API Error: " . $e->getMessage());
    echo json_encode(generateNeuralResponse(
        false,
        'Failed to retrieve neural network statistics',
        [],
        'STATS_ERROR'
    ));
}
?>
