export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          role: "user" | "admin" | "moderator"
          is_active: boolean
          email_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          role?: "user" | "admin" | "moderator"
          is_active?: boolean
          email_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          role?: "user" | "admin" | "moderator"
          is_active?: boolean
          email_verified?: boolean
          updated_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image: string | null
          gallery_images: string[] | null
          author_id: string | null
          category_id: string | null
          subcategory_id: string | null
          species: "chien" | "chat" | "les-deux" | "autre" | null
          age_range: "chiot-chaton" | "adulte" | "senior" | "tous" | null
          difficulty_level: "debutant" | "intermediaire" | "avance" | null
          reading_time: number | null
          is_vet_approved: boolean
          is_featured: boolean
          is_published: boolean
          published_at: string | null
          view_count: number
          like_count: number
          comment_count: number
          seo_title: string | null
          seo_description: string | null
          seo_keywords: string | null
          pdf_url: string | null
          price: number | null
          is_ebook: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          gallery_images?: string[] | null
          author_id?: string | null
          category_id?: string | null
          subcategory_id?: string | null
          species?: "chien" | "chat" | "les-deux" | "autre" | null
          age_range?: "chiot-chaton" | "adulte" | "senior" | "tous" | null
          difficulty_level?: "debutant" | "intermediaire" | "avance" | null
          reading_time?: number | null
          is_vet_approved?: boolean
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          view_count?: number
          like_count?: number
          comment_count?: number
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          pdf_url?: string | null
          price?: number | null
          is_ebook?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          gallery_images?: string[] | null
          author_id?: string | null
          category_id?: string | null
          subcategory_id?: string | null
          species?: "chien" | "chat" | "les-deux" | "autre" | null
          age_range?: "chiot-chaton" | "adulte" | "senior" | "tous" | null
          difficulty_level?: "debutant" | "intermediaire" | "avance" | null
          reading_time?: number | null
          is_vet_approved?: boolean
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          view_count?: number
          like_count?: number
          comment_count?: number
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          pdf_url?: string | null
          price?: number | null
          is_ebook?: boolean
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          sku: string | null
          brand_id: string | null
          category_id: string | null
          subcategory_id: string | null
          price: number
          original_price: number | null
          stock_quantity: number
          weight: number | null
          species: "chien" | "chat" | "mixte" | null
          featured_image: string | null
          gallery_images: string[] | null
          is_featured: boolean
          is_bestseller: boolean
          is_new: boolean
          is_active: boolean
          rating_average: number
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          sku?: string | null
          brand_id?: string | null
          category_id?: string | null
          subcategory_id?: string | null
          price: number
          original_price?: number | null
          stock_quantity?: number
          weight?: number | null
          species?: "chien" | "chat" | "mixte" | null
          featured_image?: string | null
          gallery_images?: string[] | null
          is_featured?: boolean
          is_bestseller?: boolean
          is_new?: boolean
          is_active?: boolean
          rating_average?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          sku?: string | null
          brand_id?: string | null
          category_id?: string | null
          subcategory_id?: string | null
          price?: number
          original_price?: number | null
          stock_quantity?: number
          weight?: number | null
          species?: "chien" | "chat" | "mixte" | null
          featured_image?: string | null
          gallery_images?: string[] | null
          is_featured?: boolean
          is_bestseller?: boolean
          is_new?: boolean
          is_active?: boolean
          rating_average?: number
          review_count?: number
          updated_at?: string
        }
      }
      donation_campaigns: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          story: string | null
          target_amount: number
          current_amount: number
          featured_image: string | null
          animal_name: string | null
          animal_type: "chien" | "chat" | "autre" | null
          is_active: boolean
          is_featured: boolean
          start_date: string
          end_date: string | null
          donor_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          story?: string | null
          target_amount: number
          current_amount?: number
          featured_image?: string | null
          animal_name?: string | null
          animal_type?: "chien" | "chat" | "autre" | null
          is_active?: boolean
          is_featured?: boolean
          start_date?: string
          end_date?: string | null
          donor_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          slug?: string
          description?: string | null
          story?: string | null
          target_amount?: number
          current_amount?: number
          featured_image?: string | null
          animal_name?: string | null
          animal_type?: "chien" | "chat" | "autre" | null
          is_active?: boolean
          is_featured?: boolean
          start_date?: string
          end_date?: string | null
          donor_count?: number
          updated_at?: string
        }
      }
      donations: {
        Row: {
          id: string
          campaign_id: string | null
          user_id: string | null
          donor_email: string | null
          donor_first_name: string | null
          amount: number
          is_monthly: boolean
          payment_method: "card" | "paypal" | "bank_transfer"
          payment_status: "pending" | "completed" | "failed" | "refunded"
          message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          campaign_id?: string | null
          user_id?: string | null
          donor_email?: string | null
          donor_first_name?: string | null
          amount: number
          is_monthly?: boolean
          payment_method: "card" | "paypal" | "bank_transfer"
          payment_status?: "pending" | "completed" | "failed" | "refunded"
          message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          campaign_id?: string | null
          user_id?: string | null
          donor_email?: string | null
          donor_first_name?: string | null
          amount?: number
          is_monthly?: boolean
          payment_method?: "card" | "paypal" | "bank_transfer"
          payment_status?: "pending" | "completed" | "failed" | "refunded"
          message?: string | null
          updated_at?: string
        }
      }
      article_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          icon: string | null
          parent_id: string | null
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          icon?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          icon?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
        }
      }
      article_tags: {
        Row: {
          id: string
          name: string
          slug: string
          color: string | null
          usage_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          color?: string | null
          usage_count?: number
          created_at?: string
        }
        Update: {
          name?: string
          slug?: string
          color?: string | null
          usage_count?: number
        }
      }
      article_tag_relations: {
        Row: {
          article_id: string
          tag_id: string
        }
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Article = Database["public"]["Tables"]["articles"]["Row"]
export type ArticleInsert = Database["public"]["Tables"]["articles"]["Insert"]
export type ArticleUpdate = Database["public"]["Tables"]["articles"]["Update"]

export type ArticleCategory = Database["public"]["Tables"]["article_categories"]["Row"]
export type ArticleCategoryInsert = Database["public"]["Tables"]["article_categories"]["Insert"]
export type ArticleCategoryUpdate = Database["public"]["Tables"]["article_categories"]["Update"]

export type ArticleTag = Database["public"]["Tables"]["article_tags"]["Row"]
export type ArticleTagInsert = Database["public"]["Tables"]["article_tags"]["Insert"]
export type ArticleTagUpdate = Database["public"]["Tables"]["article_tags"]["Update"]

export type User = Database["public"]["Tables"]["users"]["Row"]
