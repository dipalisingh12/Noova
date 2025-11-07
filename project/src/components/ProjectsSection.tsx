import { useState, useEffect } from 'react';
import { Upload, FileText, ExternalLink, Trash2, Plus } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  liveUrl: string;
  githubUrl: string;
  date: string;
}

interface CV {
  fileName: string;
  uploadDate: string;
  fileUrl: string;
}

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [];
  });

  const [cv, setCv] = useState<CV | null>(() => {
    const saved = localStorage.getItem('cv');
    return saved ? JSON.parse(saved) : null;
  });

  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState<Omit<Project, 'id' | 'date'>>({
    title: '',
    description: '',
    techStack: '',
    liveUrl: '',
    githubUrl: ''
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (cv) {
      localStorage.setItem('cv', JSON.stringify(cv));
    }
  }, [cv]);

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        ...newProject,
        id: Date.now().toString(),
        date: new Date().toISOString()
      };
      setProjects([project, ...projects]);
      setNewProject({
        title: '',
        description: '',
        techStack: '',
        liveUrl: '',
        githubUrl: ''
      });
      setShowAddProject(false);
    }
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setCv({
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        fileUrl
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">CV / Resume</h2>
          </div>
        </div>

        {cv ? (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold mb-1">{cv.fileName}</p>
                <p className="text-slate-400 text-sm">
                  Uploaded on {new Date(cv.uploadDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={cv.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View
                </a>
                <button
                  onClick={() => setCv(null)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors">
            <input
              type="file"
              id="cv-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleCVUpload}
              className="hidden"
            />
            <label
              htmlFor="cv-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-12 h-12 text-slate-500 mb-3" />
              <p className="text-white font-semibold mb-1">Upload your CV</p>
              <p className="text-slate-400 text-sm">PDF, DOC, or DOCX</p>
            </label>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">Projects</h2>
          </div>
          <button
            onClick={() => setShowAddProject(!showAddProject)}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>

        {showAddProject && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
            <h3 className="text-lg font-bold text-white mb-4">Add New Project</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-600 focus:border-emerald-500 focus:outline-none"
              />
              <textarea
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-600 focus:border-emerald-500 focus:outline-none resize-none"
              />
              <input
                type="text"
                placeholder="Tech Stack (e.g., React, FastAPI, Python)"
                value={newProject.techStack}
                onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-600 focus:border-emerald-500 focus:outline-none"
              />
              <input
                type="url"
                placeholder="Live Demo URL (optional)"
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-600 focus:border-emerald-500 focus:outline-none"
              />
              <input
                type="url"
                placeholder="GitHub URL (optional)"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-600 focus:border-emerald-500 focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddProject}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Save Project
                </button>
                <button
                  onClick={() => setShowAddProject(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No projects added yet. Click "Add Project" to get started!
            </div>
          ) : (
            projects.map(project => (
              <div
                key={project.id}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-3">{project.description}</p>
                    {project.techStack && (
                      <p className="text-emerald-400 text-sm font-semibold">
                        Tech: {project.techStack}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-slate-700 text-white text-sm rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

import { Briefcase } from 'lucide-react';
