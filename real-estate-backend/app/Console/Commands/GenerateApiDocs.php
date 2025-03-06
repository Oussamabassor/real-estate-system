<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

class GenerateApiDocs extends Command
{
    protected $signature = 'api:docs';
    protected $description = 'Generate API documentation';

    public function handle()
    {
        $this->info('Generating API documentation...');

        $routes = collect(Route::getRoutes()->getRoutesByMethod());
        $docs = [];

        foreach ($routes as $method => $routes) {
            foreach ($routes as $route) {
                $docs[] = [
                    'method' => $method,
                    'uri' => $route->uri(),
                    'name' => $route->getName(),
                    'action' => $route->getActionName(),
                    'middleware' => $route->middleware(),
                ];
            }
        }

        $markdown = $this->generateMarkdown($docs);
        $this->saveMarkdown($markdown);

        $this->info('API documentation generated successfully!');
    }

    protected function generateMarkdown(array $docs): string
    {
        $markdown = "# Real Estate System API Documentation\n\n";
        $markdown .= "## Table of Contents\n\n";

        // Group routes by prefix
        $groupedRoutes = collect($docs)->groupBy(function ($route) {
            $parts = explode('/', $route['uri']);
            return $parts[0];
        });

        // Generate table of contents
        foreach ($groupedRoutes as $prefix => $routes) {
            $markdown .= "- [{$prefix}](#{$prefix})\n";
        }

        $markdown .= "\n## Routes\n\n";

        // Generate route documentation
        foreach ($groupedRoutes as $prefix => $routes) {
            $markdown .= "### {$prefix}\n\n";
            $markdown .= "| Method | URI | Name | Action | Middleware |\n";
            $markdown .= "|--------|-----|------|---------|------------|\n";

            foreach ($routes as $route) {
                $markdown .= "| {$route['method']} | {$route['uri']} | {$route['name']} | {$route['action']} | " . implode(', ', $route['middleware']) . " |\n";
            }

            $markdown .= "\n";
        }

        return $markdown;
    }

    protected function saveMarkdown(string $markdown): void
    {
        $path = base_path('docs/api.md');
        File::put($path, $markdown);
    }
} 